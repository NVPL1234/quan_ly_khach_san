 package com.example.spring_boot_api_jwt_ad.test;

 import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
 import java.util.Date;
import java.util.TimeZone;

// import com.example.spring_boot_api_jwt_ad.entity.Order;

 public class Test {
	 
	public static void xinChào() {
		System.out.println("Xin Chào!");
	}
	
	/** @author Nguyễn Võ Phú Lam*/
	public static void lấyThôngTinNgườiDùng() {
		System.out.println("lấyThôngTinNgườiDùng");
	}
	
 	public static void main(String[] args) throws Exception {
 		
 		int a=1, b=100;
 		System.out.println(a-b);
 		
// 		Date ngayNhan = new Date();
// 		ngayNhan.setHours(12);
// 		ngayNhan.setMinutes(12);
// 		ngayNhan.setSeconds(12);
// 		ngayNhan.setDate(31);
// 		ngayNhan.setMonth(2);
// 		ngayNhan.setYear(2023 - 1900);
// 		System.out.println(ngayNhan);
// 		long ngayNhan2 = ngayNhan.getTime();
// 		System.out.println(ngayNhan2/86400000 + 1);
// 		
// 		Thread.sleep(1000);
// 		
// 		Date ngayTra = new Date();
// 		long ngayTra2 = ngayTra.getTime();
// 		System.out.println(ngayTra2/86400000 + 1);
 		
// 		SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd' 'HH:mm:ss");
//		try {
//			Date date = isoFormat.parse("2023-03-24 18:00:00.000");
//			System.out.println(date);
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
// 		xinChào();
// 		lấyThôngTinNgườiDùng();
// 		HoaDon hoaDon = new HoaDon();
// 		hoaDon.setNgayLapHD(null);
// 		System.out.println(hoaDon);
		
// 		long orderTime=1;
		
// 		while (orderTime>0) {
// 			Date dateOrder = new Date();
// 			orderTime = dateOrder.getTime();
// 			dateOrder.setTime(orderTime);
// 			System.out.println("Order Time: " + dateOrder.getTime());
			
// 			Thread.sleep(1000);
			
// 			Date dateNow = new Date();
// 			dateNow.setTime(1673168695619l);
// 			System.out.println("Now Time: " + dateNow.getTime());
			
// 			long payTime = dateNow.getTime() - dateOrder.getTime();
			
			
// 			System.out.printf("%5.10f", (double) payTime / 3600000);
			
// 			orderTime=0;
// 		}
		
 	}
 }
