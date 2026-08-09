package com.example.backend.comment;

import java.time.OffsetDateTime;

public record CommentResponse(
        Long id,
        String authorName,
        String content,
        OffsetDateTime createdAt
) {
    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getAuthorName(),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}