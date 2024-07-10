package com.uisrael.enrollment_service.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "enrollment")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Enrollment {
	@Id
	private String id;
	private String iduser;
	private String idcourse;
	private String state;
	private String description;
	private String creationdate;

}
