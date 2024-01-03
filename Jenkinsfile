pipeline {
    agent any 

    tools {
        nodejs 'Nodejs-18.7.0'
    }

    stages {
        stage('Checkout') {
            steps {
                // Thay đổi URL của Git repository của bạn
                git 'https://github.com/bhtoan2204/classroom'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Thay đổi tên của công cụ SonarQube Scanner nếu cần
                    def scannerTool = tool name: 'sonarQube-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'

                    if (scannerTool == null) {
                        error('SonarQube Scanner tool not found')
                    }

                    def sonarqubeToken = credentials('Sonarqube-token')

                    if (sonarqubeToken == null) {
                        error('SonarQube token is not defined')
                    }

                    // Sử dụng công cụ SonarQube Scanner và credentials
                    withEnv(["PATH+SONAR_RUNNER=${scannerTool}/bin"]) {
                        sh "sonar-scanner -Dsonar.projectKey=classroom-website-key -Dsonar.sources=. -Dsonar.host.url=http://20.2.84.172/ -Dsonar.login=${sonarqubeToken}"
                    }
                }
            }
        }
    }
}
