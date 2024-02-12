в папке client лежит фронт проекта 
в папке server лежит бекенд проекта

environment to Postgres:
POSTGRES_DB=hackathon
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
environment to backend:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/hackathon
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=postgres
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update