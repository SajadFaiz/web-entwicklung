package com.example.backend.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CommentRequest(

        @NotBlank(message = "Author name is required")
        @Size(
                min = 2,
                max = 80,
                message = "Author name must contain 2 to 80 characters"
        )
        String authorName,

        @NotBlank(message = "Comment is required")
        @Size(
                min = 5,
                max = 1000,
                message = "Comment must contain 5 to 1000 characters"
        )
        String content
) {
}