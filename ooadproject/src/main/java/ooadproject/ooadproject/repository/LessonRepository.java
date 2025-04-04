package ooadproject.ooadproject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import ooadproject.ooadproject.models.Lessons;
import org.bson.types.ObjectId;
import java.util.List;

public interface LessonRepository extends MongoRepository<Lessons, String> {
    List<Lessons> findByCourseId(ObjectId courseId);
    
    @Query("{ 'courseId' : ?0 }")
    List<Lessons> findByCourseIdString(ObjectId courseId);
}
