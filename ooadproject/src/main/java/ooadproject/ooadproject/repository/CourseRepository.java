package ooadproject.ooadproject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ooadproject.ooadproject.models.Courses;

public interface CourseRepository extends MongoRepository<Courses, String> {
}
