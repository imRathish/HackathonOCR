package com;

import java.util.Date;



public class Date1 {
	private int day;
	private int month;
	private int year;
	
	
	
	public Date1(int day, int month, int year) {
		this.day = day;
		this.month = month;
		this.year = year;
	}
		
	public int getDay() {
		return day;
	}

	public int getMonth() {
		return month;
	}

	public int getYear() {
		return year;
	}

	public void daysBetween(Date1 date){
		Date d1 = null;
		Date d2 = null;
		long diff = -1;
		if(this.day>=1 && this.day<=31 && this.month>=1 && this.month<=31){
			d1 = new Date(date.getYear(),date.getMonth(),date.getDay());
		}else{
			System.out.println("Invalid Date");
		}
		if(date.getDay()>=1 && date.getDay()<=31 && date.getMonth()>=1 && date.getMonth()<=31){
			d2 = new Date(this.year,this.month,this.day);
		}else{
			System.out.println("Invalid Date");
		}
		if(d1!=null && d2!=null){
			diff = Math.abs((d1.getTime() - d2.getTime())/86400000);
		}
		if(diff!=-1){
			System.out.println("Number of Days : "+diff);
		}
		
	}
	
	public static void main(String[] args) {
		Date1 d1 = new Date1(18, 8, 2018) ;
		Date1 d2 = new Date1(5,8,2019);
		
		d1.daysBetween(d2);

	}

	
	
	
	
	
	
	

}
