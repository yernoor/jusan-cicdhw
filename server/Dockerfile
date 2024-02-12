FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY /pom.xml .
COPY /src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/back-end-0.0.1-SNAPSHOT.jar /app/

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/hackathon
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=postgres
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update

CMD ["java", "-jar", "/app/back-end-0.0.1-SNAPSHOT.jar"]
