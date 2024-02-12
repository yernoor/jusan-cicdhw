pipeline 
{
    agent any
    stages {
        stage('Git') {
            steps {
                git url: 'https://github.com/yernoor/jusan-cicdhw.git', branch: 'main'
            }
        }
        stage('Build Images') {
            steps {
                script {
                    sh 'docker build -t frontend ./client'
                    sh 'docker build -t backend ./server'
                    
                }
            }
        }
        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    
    }    
}