package ooadproject.ooadproject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import ooadproject.ooadproject.models.QuizResponse;
public interface QuizResponseRepository extends MongoRepository<QuizResponse, String> {
    QuizResponse findByCourseId(ObjectId courseId);
    QuizResponse findByCourseIdAndUserId(ObjectId courseId, ObjectId userId);
}
