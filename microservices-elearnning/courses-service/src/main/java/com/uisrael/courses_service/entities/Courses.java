package com.uisrael.courses_service.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "courses")
public class Courses {
	
	 	@Id
	    @Column(columnDefinition = "CHAR(36)")
	    private String id;
	    
	    @NotNull
	    private String id_usuario;
	    
	    @NotBlank
	    private String name;
	    
	    private String description;
	    private String durationTime;
	    
	    @Column(columnDefinition = "Integer default 1")
	    private Integer state;

	    @PrePersist
	    public void generateId() {
	        if (id == null) {
	            id = UUID.randomUUID().toString();
	        }
	    }
}
