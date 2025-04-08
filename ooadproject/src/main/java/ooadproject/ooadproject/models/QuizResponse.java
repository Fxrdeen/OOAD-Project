package ooadproject.ooadproject.models;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "quiz_responses")
public class QuizResponse {
    @Id
    private String id;
    @Field("userId")
    private ObjectId     userId;
    @Field("courseId")
    private ObjectId courseId;
    @Field("answers")
    private List<Answer> answers;
    @Field("score")
    private int score;
    public QuizResponse(String id, ObjectId userId, ObjectId courseId, List<Answer> answers, int score) {
        this.id = id;
        this.userId = userId;
        this.courseId = courseId;
        this.answers = answers;
        this.score = score;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public String getId() {
            return id;
    }

    public ObjectId getCourseId() {
        return courseId;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public int getScore() {
        return score;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCourseId(ObjectId courseId) {
        this.courseId = courseId;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
