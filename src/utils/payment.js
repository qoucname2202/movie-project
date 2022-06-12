import dateFormat from 'date-format';
import sortObject from 'sortobject';
import qs from 'qs';
const crypto = require('crypto-js');
// {
// amount,bankCode,orderDescription
// }
const payment = (req) => {
  var tmnCode = '0XLTKCAO';
  var secretKey = 'YPSMNXEWXRULNRGSUHIUKYAZGLZPMVUC';
  var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  var returnUrl = 'http://localhost:3000/VNPayReturn';

  var date = new Date();
  var createDate = dateFormat('yyyyMMdd', date) + dateFormat('hhmmss', date);
  var orderId = dateFormat('hhmmss', date);
  var amount = req.amount;
  var bankCode = req.bankCode;

  var orderInfo = req.orderDescription;
  var orderType = req.orderType || 'other';

  if (!orderInfo || !amount) {
    throw new Error('Content and amount is required!');
  }

  var locale = 'vn';
  var currCode = 'VND';
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.0.1';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = '113.172.226.116';
  vnp_Params['vnp_CreateDate'] = parseInt(createDate);
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = qs.stringify(vnp_Params, { encode: false });
  var signed = crypto.SHA256(secretKey + signData).toString(crypto.enc.Hex);
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });
  return vnpUrl;
};
export default payment;
