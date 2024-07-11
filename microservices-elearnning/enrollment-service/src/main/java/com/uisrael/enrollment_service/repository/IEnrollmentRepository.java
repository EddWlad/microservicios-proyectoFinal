package com.uisrael.enrollment_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.uisrael.enrollment_service.entity.Enrollment;

@Repository
public interface IEnrollmentRepository extends MongoRepository<Enrollment, String> {

}
