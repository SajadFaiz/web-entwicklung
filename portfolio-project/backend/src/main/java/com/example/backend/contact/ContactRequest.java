package com.example.backend.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(

        @NotBlank(message = "Name is required")
        @Size(
                min = 2,
                max = 100,
                message = "Name must contain 2 to 100 characters"
        )
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Email address is invalid")
        @Size(
                max = 200,
                message = "Email cannot exceed 200 characters"
        )
        String email,

        @NotBlank(message = "Subject is required")
        @Size(
                min = 3,
                max = 150,
                message = "Subject must contain 3 to 150 characters"
        )
        String subject,

        @NotBlank(message = "Message is required")
        @Size(
                min = 10,
                max = 3000,
                message = "Message must contain 10 to 3000 characters"
        )
        String message
) {
}