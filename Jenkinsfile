pipeline 
{
    agent any
    stages {
        stage('Git') {
            steps {
                git url: 'https://github.com/yernoor/jusan-cicdhw.git', branch: 'main'
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    docker.build('frontend', './client')
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    docker.build('backend', './server')
                }
            }
        }
        stage('Publish Locally') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    
    }    
}