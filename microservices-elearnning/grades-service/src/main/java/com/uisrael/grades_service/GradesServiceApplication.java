package com.uisrael.grades_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class GradesServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GradesServiceApplication.class, args);
	}

}
