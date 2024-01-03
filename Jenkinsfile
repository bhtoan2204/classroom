pipeline {
    agent any 
    tools {
        nodejs 'Nodejs-18.7.0'
    }
    stages {
        stage('Check Nodejs version') {
            steps {
                sh 'node -v'
            }
        }
    }
}
