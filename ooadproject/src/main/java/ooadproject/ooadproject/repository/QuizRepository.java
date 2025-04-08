package ooadproject.ooadproject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import ooadproject.ooadproject.models.Quiz;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    Quiz findByCourseId(ObjectId courseId);
}


