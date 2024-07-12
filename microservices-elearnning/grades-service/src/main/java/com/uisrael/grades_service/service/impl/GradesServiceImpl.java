package com.uisrael.grades_service.service.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.uisrael.grades_service.entities.Grades;
import com.uisrael.grades_service.exception.ResourcesNotFoundException;
import com.uisrael.grades_service.reporitory.IGradesRepository;
import com.uisrael.grades_service.service.IGradesService;

@Service
public class GradesServiceImpl implements IGradesService{

	@Autowired
	private IGradesRepository gradesRepository;
	
	@Override
	public List<Grades> getAll() {
		return gradesRepository.findByStateNot(0);
	}

	@Override
	public Grades getById(String id) {
		return gradesRepository.findById(id).orElseThrow(()->
				new ResourcesNotFoundException("Nota no encontrada con el ID: " +id));
	}

	@Override
	public Optional<Grades> searchById(String id) {
		return gradesRepository.findById(id);
	}

	@Override
	public Grades createGrades(Grades grades) {
		return gradesRepository.save(grades);
	}

	@Override
	public Grades updateGrades(String id, Grades grades) {
		Grades gradesDb = gradesRepository.findById(id).orElse(null);
		if (gradesDb != null) {
			gradesDb.setGrade(grades.getGrade());
			gradesDb.setState(grades.getState());
			return gradesRepository.save(gradesDb);
		} else {
			return null;
		}
	}

	@Override
	public boolean deleteGrades(String id) {
		Grades gradesDb = gradesRepository.findById(id).orElse(null);
		if (gradesDb != null) {
			gradesDb.setState(0);
			gradesRepository.save(gradesDb);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Grades searchByGrade(double grade) {
		return gradesRepository.findByGrade(grade).orElse(null);
	}

}
