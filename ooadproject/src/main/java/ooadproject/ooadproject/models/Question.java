package ooadproject.ooadproject.models;

public class Question {
    private String question;
    private String[] options;
    private String answer;

    public Question(String question, String[] options, String answer) { 
        this.question = question;
        this.options = options;
        this.answer = answer;
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
