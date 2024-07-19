package com.uisrael.courses_service.service.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.uisrael.courses_service.entities.Courses;
import com.uisrael.courses_service.exception.ResourcesNotFoundException;
import com.uisrael.courses_service.repository.ICoursesRepository;
import com.uisrael.courses_service.service.ICoursesService;

import brave.Span;
import brave.Tracer;

@Service
public class CoursesServiceImpl implements ICoursesService{
	
	/*private Logger logger = LoggerFactory.getLogger(ICoursesService.class);*/
	
	/*@Autowired
	private RestTemplate restTemplate;*/
	
	@Autowired
	private ICoursesRepository coursesRepository;

	
	@Override
	public List<Courses> getAll() {
		return coursesRepository.findByStateNot(0);
	}

	@Override
	public Courses getById(String id) {
		/*Courses course = coursesRepository.findById(id).orElseThrow(()->
		new ResourcesNotFoundException("Usuario no encontrado con el ID: " +id));*/
		return coursesRepository.findById(id).orElseThrow(()->
			new ResourcesNotFoundException("Usuario no encontrado con el ID: " +id));
	}

	@Override
	public Optional<Courses> searchById(String id) {
		return coursesRepository.findById(id);
	}

	@Override
	public Courses createCourse(Courses courses) {
		return coursesRepository.save(courses);
	}

	@Override
	public Courses updateCourses(String id, Courses courses) {
		Courses courseDb = coursesRepository.findById(id).orElse(null);
		if(courseDb != null)
		{
			courseDb.setName(courses.getName());
			courseDb.setId_usuario(courses.getId_usuario());
			courseDb.setDescription(courses.getDescription());
			courseDb.setDurationTime(courses.getDurationTime());
			courseDb.setState(courses.getState());
			return coursesRepository.save(courseDb);
		}
		else
		{
			return null;
		}
	}

	@Override
	public boolean deleteCourses(String id) {
		Courses courseDb = coursesRepository.findById(id).orElse(null);
		if(courseDb != null)
		{
			courseDb.setState(0);
			coursesRepository.save(courseDb);
			return true;
		}
		else
		{
			return false;
		}
	}

	@Override
	public Long countCourses() {
		return coursesRepository.count();
	}

	@Override
	public Courses searchByName(String name) {
		return coursesRepository.findByName(name).orElse(null);
	}



}
