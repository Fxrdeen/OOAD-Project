package ooadproject.ooadproject.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import ooadproject.ooadproject.models.Courses;
import java.util.List;
public interface CourseRepository extends MongoRepository<Courses, String> {

    @Query("{instructor_id: ?0}")
    List<Courses> findByInstructorId(ObjectId instructorId);
}
