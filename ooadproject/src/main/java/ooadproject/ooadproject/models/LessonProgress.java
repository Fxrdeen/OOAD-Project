package ooadproject.ooadproject.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import ooadproject.ooadproject.config.ObjectIdSerializer;

@Document(collection = "lesson_progress")
public class LessonProgress {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    @Field("user_id")
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId userId;

    @Field("course_id")
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId courseId;

    @Field("lesson_id")
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId lessonId;

    @Field("is_completed")
    private boolean isCompleted;

    public LessonProgress(ObjectId userId, ObjectId courseId, ObjectId lessonId, boolean isCompleted) {
        this.userId = userId;
        this.courseId = courseId;
        this.lessonId = lessonId;
        this.isCompleted = isCompleted;
    }

    public LessonProgress() {
    }

    public ObjectId getId() {
        return id;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public ObjectId getCourseId() {
        return courseId;
    }

    public ObjectId getLessonId() {
        return lessonId;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }   

    public void setCourseId(ObjectId courseId) {
        this.courseId = courseId;
    }

    public void setLessonId(ObjectId lessonId) {
        this.lessonId = lessonId;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }


    
    
}
