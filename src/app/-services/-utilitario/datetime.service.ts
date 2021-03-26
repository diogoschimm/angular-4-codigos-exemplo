import { Injectable } from '@angular/core';  

@Injectable()
export class DateTimeService {

 constructor() { }

 dateDiff(dataInicial: Date, dataFinal: Date, tipo: EDatetime): number {
   let t1 = dataInicial.getTime();
   let t2 = dataFinal.getTime();

   if (tipo == EDatetime.Days){
     return parseInt(((t2-t1)/(24*3600*1000)).toString());
   }
   if (tipo == EDatetime.Weeks){
     return parseInt(((t2-t1)/(24*3600*1000*7)).toString());
   }
   if (tipo == EDatetime.Months){

     var d1Y = dataInicial.getFullYear();
     var d2Y = dataFinal.getFullYear();
     var d1M = dataInicial.getMonth();
     var d2M = dataFinal.getMonth();

     return (d2M+12*d2Y)-(d1M+12*d1Y);
   }
   return dataFinal.getFullYear()-dataInicial.getFullYear();
 }
 addDays(data: Date, qtdDias: number): Date {
   data.setDate(data.getDate() + qtdDias);
   return data;
 }
 addHours(data: Date, qtdHoras: number): Date {
   data.setHours(data.getHours() + qtdHoras);
   return data;
 }
 addMinutes(data: Date, qtdMinutos: number): Date{
   data.setMinutes(data.getMinutes() + qtdMinutos);
   return data;
 }
 addSeconds(data: Date, qtdSegundos: number): Date{
   data.setSeconds(data.getSeconds() + qtdSegundos);
   return data;
 }
 addMiliSeconds(data: Date, qtdMiliSeconds: number): Date{

   data.setMilliseconds(data.getMilliseconds() + qtdMiliSeconds);
   return data;
 }

 isToday(data: Date) : boolean{
   let today = new Date();

   return data.getFullYear() === today.getFullYear() && 
          data.getMonth() === today.getMonth() && 
          data.getDate() === today.getDate();
 }
 isWeekend(data: Date): boolean{
   return data.getDay() === 0 || data.getDay() === 6;
 } 
}
