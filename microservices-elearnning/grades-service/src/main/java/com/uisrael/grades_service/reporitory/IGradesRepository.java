package com.uisrael.grades_service.reporitory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uisrael.grades_service.entities.Grades;

@Repository
public interface IGradesRepository extends JpaRepository<Grades, String>{
	List<Grades> findByStateNot(Integer state);
	Optional<Grades> findByGrade(double grade);
}
