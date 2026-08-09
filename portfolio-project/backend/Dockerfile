FROM eclipse-temurin:21-jdk AS build

WORKDIR /application

COPY pom.xml .
COPY src ./src

RUN ./mvnw clean package -DskipTests || \
    mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /application

COPY --from=build \
    /application/target/developer-portfolio-backend-1.0.0.jar \
    application.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "application.jar"]