import { Payment } from "./validations";
export function getCurrentMonth(): string {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date()
  const currentMonth = month[date.getMonth()]
  return currentMonth
}

export function getCurrentDate(): string {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
}

export function calculateExpireDate(selectedPaymentType: string): Date {
  const currentDate = new Date()
  const expireDate = new Date(currentDate)
  if(selectedPaymentType === Payment.One_Month) {
    expireDate.setMonth(expireDate.getMonth() + 1)
  } else if (selectedPaymentType === Payment.Three_Month) {
    expireDate.setMonth(expireDate.getMonth() + 3)
  } else if (selectedPaymentType === Payment.Twelve_Month) {
    expireDate.setMonth(expireDate.getMonth() + 12)
  }

  return expireDate
}

export function isMembershipActive(expireDate: Date): boolean {
  const currentDate = new Date();
  return expireDate >= currentDate;
}
