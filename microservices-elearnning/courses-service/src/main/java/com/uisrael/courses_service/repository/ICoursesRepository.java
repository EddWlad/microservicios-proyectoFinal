package com.uisrael.courses_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uisrael.courses_service.entities.Courses;

@Repository
public interface ICoursesRepository extends JpaRepository<Courses, String> {
	List<Courses> findByStateNot(Integer state);
	Optional<Courses> findByName(String name);
}
