package com.example.backend.common;

import java.time.OffsetDateTime;
import java.util.Map;

public record ApiError(
        OffsetDateTime timestamp,
        int status,
        String message,
        Map<String, String> validationErrors
) {
}