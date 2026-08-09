package com.example.backend.comment;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> findAll() {
        return commentRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(CommentResponse::from)
                .toList();
    }

    public CommentResponse create(CommentRequest request) {
        Comment comment = new Comment(
                request.authorName().trim(),
                request.content().trim(),
                OffsetDateTime.now(ZoneOffset.UTC)
        );

        return CommentResponse.from(commentRepository.save(comment));
    }
}