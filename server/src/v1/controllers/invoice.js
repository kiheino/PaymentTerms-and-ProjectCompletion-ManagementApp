const Project = require("../models/project");
const Invoice = require("../models/invoice");

exports.registerCompletion = async (req, res) => {
  console.log(req.body);
  try {
    const { projectId, completionDate } = req.body;
    const project = await Project.findById(projectId).populate("client");
    const { cutoffDate, paymentMonth, paymentDay } = project.client;
    const today = new Date();

    const [year, month, day] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];

    const adjustPaymentDay = (x, y) => {
      if (paymentDay === "99") {
        const date = new Date(x, y, 0);
        return date.getDate();
      } else {
        return paymentDay;
      }
    };
    const getInvoiceDate = () => {
      const completionDay = new Date(completionDate).getDate();
      if (cutoffDate !== "99") {
        if (completionDay <= Number(cutoffDate)) {
          return year + "/" + month + "/" + cutoffDate;
        } else {
          return year + "/" + (month + 1) + "/" + cutoffDate;
        }
      } else if (day < 5 && completionDay > 5) {
        //末締めで前月の工事完了を５ 日までに登録した場合
        const date = new Date(year, month - 1, 0);
        const lastDay = date.getDate();
        return year + "/" + (month - 1) + "/" + lastDay;
      } else {
        const date = new Date(year, month, 0);
        const lastDay = date.getDate();
        return year + "/" + month + "/" + lastDay;
      }
    };
    const invoiceDate = new Date(getInvoiceDate());
    const invoiceMonth = invoiceDate.getMonth() + 1;
    const dueDate = () => {
      if (paymentMonth === "nextMonth") {
        if (invoiceMonth === 12) {
          if (month === 12) {
            return year + 1 + "/1/" + adjustPaymentDay(year + 1, 1);
          } else {
            //month === 1の場合
            return year + "/1/" + adjustPaymentDay(year, 1);
          }
        } else {
          return (
            year +
            "/" +
            (invoiceMonth + 1) +
            "/" +
            adjustPaymentDay(year, invoiceMonth + 1)
          );
        } //以下翌々月支払の場合で条件分け
      } else if (invoiceMonth === 11) {
        return year + 1 + "/1/" + adjustPaymentDay(year + 1, 1);
      } else if (invoiceMonth === 12) {
        if (month === 12) {
          return year + 1 + "/2/" + adjustPaymentDay(year + 1, 2);
        } else {
          //month === 1の場合
          return year + "/2/" + adjustPaymentDay(year, 2);
        }
      } else {
        return (
          year +
          "/" +
          (invoiceMonth + 2) +
          "/" +
          adjustPaymentDay(year, invoiceMonth + 2)
        );
      }
    };
    const invoiceData = {
      client: project.client._id,
      projects: projectId,
      invoiceDate: invoiceDate,
      dueDate: dueDate(),
    };

    const invoiceToShare = await Invoice.findOne({
      client: project.client._id,
      invoiceDate: invoiceDate,
    });
    const createOrUpdate = async () => {
      const updates = {
        completionDate: completionDate,
        isCompleted: true,
      };
      if (invoiceToShare === null) {
        const result = await Invoice.create(invoiceData);
        updates.invoice = result._id;
        await Project.findByIdAndUpdate(projectId, updates);
      } else {
        await Invoice.findByIdAndUpdate(invoiceToShare._id, {
          $push: { projects: projectId },
        });
        updates.invoiceId = invoiceToShare._id;

        await Project.findByIdAndUpdate(projectId, updates);
      }
    };
    createOrUpdate();

    const calculateBillingAmount = async () => {
      console.log(!project.billingAmount.length);
      if (!project.billingAmount.length) {
        const updates = {
          billingAmount: {
            date: invoiceDate,
            amount: project.contractAmount,
          },
        };
        await Project.findByIdAndUpdate(projectId, updates);
      } else {
        const amount =
          project.contractAmount -
          project.billingAmount.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.amount;
          }, 0);
        console.log(`残金: ${amount}`);
        const updates = {
          date: invoiceDate,
          amount: amount,
        };
        await Project.findByIdAndUpdate(projectId, {
          $push: { billingAmount: updates },
        });
      }
    };
    calculateBillingAmount();

    return res.status(200).json("成功");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.registerProgressClaims = async (req, res) => {
  try {
    const { projectId, amount } = req.body;
    const numberAmount = Number(amount.replaceAll(",", ""));
    const project = await Project.findById(projectId).populate("client");
    const { cutoffDate, paymentMonth, paymentDay } = project.client;
    const today = new Date();
    const [year, month, day] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];

    const getInvoiceDate = () => {
      if (cutoffDate !== "99") {
        return year + "/" + month + "/" + cutoffDate;
      } else if (day < 5) {
        //末締めで前月の出来高を５日までに登録した場合
        const date = new Date(year, month - 1, 0);
        const lastDay = date.getDate();
        return year + "/" + (month - 1) + "/" + lastDay;
      } else {
        const date = new Date(year, month, 0);
        const lastDay = date.getDate();
        return year + "/" + month + "/" + lastDay;
      }
    };
    const adjustPaymentDay = (x, y) => {
      if (paymentDay === "99") {
        const date = new Date(x, y, 0);
        return date.getDate();
      } else {
        return paymentDay;
      }
    };
    const invoiceDate = new Date(getInvoiceDate());

    const invoiceMonth = invoiceDate.getMonth() + 1;
    const dueDate = () => {
      if (paymentMonth === "nextMonth") {
        if (invoiceMonth === 12) {
          if (month === 12) {
            return year + 1 + "/1/" + adjustPaymentDay(year + 1, 1);
          } else {
            //month === 1の場合
            return year + "/1/" + adjustPaymentDay(year, 1);
          }
        } else {
          return (
            year +
            "/" +
            (invoiceMonth + 1) +
            "/" +
            adjustPaymentDay(year, invoiceMonth + 1)
          );
        } //以下翌々月支払の場合で条件分け
      } else if (invoiceMonth === 11) {
        return year + 1 + "/1/" + adjustPaymentDay(year + 1, 1);
      } else if (invoiceMonth === 12) {
        if (month === 12) {
          return year + 1 + "/2/" + adjustPaymentDay(year + 1, 2);
        } else {
          //month === 1の場合
          return year + "/2/" + adjustPaymentDay(year, 2);
        }
      } else {
        console.log("two month After ");
        return (
          year +
          "/" +
          (invoiceMonth + 2) +
          "/" +
          adjustPaymentDay(year, invoiceMonth + 2)
        );
      }
    };
    const invoiceData = {
      client: project.client._id,
      projects: projectId,
      invoiceDate: invoiceDate,
      dueDate: dueDate(),
    };
    const invoiceToShare = await Invoice.findOne(
      {
        client: project.client._id,
      },
      { invoiceDate: invoiceDate }
    );
    const createOrUpdate = async () => {
      if (invoiceToShare === null) {
        const result = await Invoice.create(invoiceData);
        await Project.findByIdAndUpdate(projectId, { invoiceId: result._id });
      } else {
        await Invoice.findByIdAndUpdate(invoiceToShare._id, {
          $push: { projects: projectId },
        });
        await Project.findByIdAndUpdate(projectId, {
          invoiceId: invoiceToShare._id,
        });
      }
    };
    createOrUpdate();
    const registerBillingInfo = async () => {
      await Project.findByIdAndUpdate(projectId, {
        $push: {
          billingAmount: {
            date: invoiceDate,
            amount: numberAmount,
          },
        },
      });
    };
    registerBillingInfo();
    return res.status(200).json("成功");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const unClaimedBills = await Invoice.find({})
      .populate({
        path: "projects",
        model: Project,
      })
      .populate("client")
      .sort("invoiceDate");
    return res.status(201).json(unClaimedBills);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
