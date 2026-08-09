package com.example.backend.contact;

import java.time.OffsetDateTime;

public record ContactResponse(
        Long id,
        String message,
        OffsetDateTime submittedAt
) {
}