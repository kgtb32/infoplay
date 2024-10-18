package dev.kgtb32.infoplay.infoplay_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class InfoplayWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfoplayWebApplication.class, args);
	}

}
