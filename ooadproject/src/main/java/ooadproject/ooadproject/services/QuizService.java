package ooadproject.ooadproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ooadproject.ooadproject.repository.QuizRepository;
import org.bson.types.ObjectId;
import ooadproject.ooadproject.models.Quiz;
import ooadproject.ooadproject.models.QuizResponse;
import ooadproject.ooadproject.repository.QuizResponseRepository;
@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuizResponseRepository quizResponseRepository;

    public Quiz getQuizByCourseId(String id) {
        return quizRepository.findByCourseId(new ObjectId(id));
    }

    public QuizResponse submitQuiz(QuizResponse quizResponse) {
        return quizResponseRepository.save(quizResponse);
    }

    public QuizResponse getQuizResponseByCourseIdAndUserId(String courseId, String userId) {
        return quizResponseRepository.findByCourseIdAndUserId(new ObjectId(courseId), new ObjectId(userId));
    }

    public String addQuiz(Quiz quiz) {
        quizRepository.save(quiz);
        return "Quiz added successfully";
    }
}
