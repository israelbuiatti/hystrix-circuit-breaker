package com.example.circuitbreaker;

import com.example.circuitbreaker.service.Service1;
import com.example.circuitbreaker.service.Service2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
//@RestController
@EnableHystrix
@EnableHystrixDashboard
public class BookMyShowApplication {

//	@Autowired
//	private Service1 service1;
//
//	@Autowired
//	private Service2 service2;
//
//	@GetMapping("/teste")
//	public String bookShow2() {
//		String emailServiceResponse1 = service1.service1();
//		String emailServiceResponse2 = service2.service2();
//
//		return emailServiceResponse1 + " - " + emailServiceResponse2;
//	}

	public static void main(String[] args) {
		SpringApplication.run(BookMyShowApplication.class, args);
	}

}
