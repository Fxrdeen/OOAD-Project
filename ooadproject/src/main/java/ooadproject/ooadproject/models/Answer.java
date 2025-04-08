package ooadproject.ooadproject.models;

public class Answer {
    private String question;
    private String[] options;
    private String answer;
    private String userAnswer;

    public Answer(String question, String[] options, String answer, String userAnswer) { 
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.userAnswer = userAnswer;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public String getQuestion() {
        return question;
    }

    public String[] getOptions() {
        return options;
    }

    public String getAnswer() {
        return answer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setOptions(String[] options) {
        this.options = options;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
