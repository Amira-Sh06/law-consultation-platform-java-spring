package com.example.Database.Service;

import com.example.Database.Models.Answer;
import com.example.Database.Repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    public Optional<Answer> getAnswerById(Long id) {
        return answerRepository.findById(id);

    }
    public List<Answer> getAnswerByQuestionId(Long id) {
        return answerRepository.findByQuestionId(id);
    }

    public List<Answer> getAnswerByLawyerId(Long id) {
        return answerRepository.findByLawyerId(id);
    }
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    @Transactional
    public Answer createAnswer(Answer answer) {
        if (answer.getCreatedAt() == null) {
            answer.setCreatedAt(LocalDateTime.now());
        }
        return answerRepository.save(answer);
    }

    @Transactional
    public Answer updateAnswer(Long id, Answer updatedAnswer) {
        Answer existingAnswer = answerRepository.findById(id).orElse(null);
        if (existingAnswer == null) {
            return null;
        }

        if (updatedAnswer.getContent() != null) {
            existingAnswer.setContent(updatedAnswer.getContent());
        }
        if (updatedAnswer.getCreatedAt() != null) {
            existingAnswer.setCreatedAt(updatedAnswer.getCreatedAt());
        }
        return answerRepository.save(existingAnswer);
    }

    @Transactional
    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }
}

