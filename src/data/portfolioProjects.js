export const portfolioProjects = [
  // ==========================================
  // AI PROJECTS (1 - 5)
  // ==========================================
  {
    id: 1,
    title: 'AI-Autonomous-Navigation-System',
    repo: 'AI-Autonomous-Navigation-System',
    category: 'AI',
    githubUrl: 'https://github.com/Saru2248/AI-Autonomous-Navigation-System',
    demoUrl: null,
    description:
      'An autonomous navigation simulation implementing perception, path planning, obstacle avoidance, and real-time decision-making. The system models vehicle kinematics and dynamic sensor data, utilizing A* and Dijkstra graph traversal algorithms to calculate collision-free optimal trajectories in complex obstacle environments. Developed entirely in Python with Pygame visual simulation, it models real-world robotics pipelines without requiring dedicated GPU acceleration.',
    techStack: ['Python 3.10+', 'Pygame', 'OpenCV', 'A* Search', 'Dijkstra', 'Kinematics'],
    highlight: 'Collision-free autonomous trajectory planning with zero GPU requirement',
    visualType: 'simulation'
  },
  {
    id: 2,
    title: 'AI-Energy-Forecasting-System',
    repo: 'AI-Powered-Energy-Consumption-Forecasting-System',
    category: 'AI',
    githubUrl: 'https://github.com/Saru2248/AI-Powered-Energy-Consumption-Forecasting-System',
    demoUrl: null,
    description:
      'An industrial machine learning pipeline for multi-horizon energy consumption forecasting. The system generates 7-day hourly energy demand forecasts with under 3% Mean Absolute Percentage Error (MAPE) using lag variables, rolling window statistics, and ensemble regression models including Random Forest and XGBoost. It models industrial tariff structures and load scheduling to help utility operators mitigate peak energy costs and prevent over-generation waste.',
    techStack: ['Python', 'XGBoost', 'Random Forest', 'Scikit-learn', 'Pandas', 'NumPy'],
    highlight: '7-day hourly energy demand forecasting with <3% MAPE accuracy',
    visualType: 'chart'
  },
  {
    id: 3,
    title: 'AI-Powered Cybersecurity Threat Detection',
    repo: 'AI-Powered-Cybersecurity-Threat-Detection-System',
    category: 'AI',
    githubUrl: 'https://github.com/Saru2248/AI-Powered-Cybersecurity-Threat-Detection-System',
    demoUrl: null,
    description:
      'An intelligent intrusion detection system combining supervised classification and unsupervised anomaly detection to identify network vulnerabilities in real time. Powered by Random Forest classification and synthetic network traffic simulation, the solution processes flow telemetry, flags attack signatures such as DDoS and port scans, and presents live triage metrics through an interactive Flask web dashboard modeled after modern Security Operations Center (SOC) workflows.',
    techStack: ['Python', 'Flask', 'Random Forest', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    highlight: 'Real-time SOC intrusion detection and multi-vector attack classification',
    visualType: 'terminal'
  },
  {
    id: 4,
    title: 'AI-Powered Medical Image Analysis',
    repo: 'AI-Powered-Medical-Image-Analysis-System',
    category: 'AI',
    githubUrl: 'https://github.com/Saru2248/AI-Powered-Medical-Image-Analysis-System',
    demoUrl: null,
    description:
      'A clinical-grade deep learning pipeline designed to detect pneumonia from chest X-ray radiography. The architecture leverages transfer learning with MobileNetV2 for lightweight, high-accuracy binary classification, coupled with Grad-CAM (Gradient-weighted Class Activation Mapping) visual heatmaps to ensure interpretability. The system provides automated triaging, preprocessing radiography scans, calculating confidence scores, and localizing pathological lung infiltrates to support clinical diagnostics.',
    techStack: ['Python', 'TensorFlow', 'Keras', 'MobileNetV2', 'OpenCV', 'Grad-CAM'],
    highlight: 'Pneumonia classification from X-rays with Grad-CAM visual explainability',
    visualType: 'ai-vision'
  },
  {
    id: 5,
    title: 'AI-Powered Predictive Maintenance for Industry',
    repo: 'AI-Powered-Predictive-Maintenance-for-IoT-Devices',
    category: 'AI',
    githubUrl: 'https://github.com/Saru2248/AI-Powered-Predictive-Maintenance-for-IoT-Devices',
    demoUrl: null,
    description:
      'An Industrial IoT (IIoT) predictive maintenance engine designed to anticipate machinery failures before catastrophic downtime occurs. The system continuously evaluates multi-channel sensor telemetry—including rotational speed, torque, process temperature, and tool wear index—using ensemble machine learning classifiers. It provides probabilistic risk categorization, early failure alerts, and maintenance urgency scoring to help manufacturing teams optimize asset lifecycle schedules.',
    techStack: ['Python', 'Scikit-learn', 'Random Forest', 'Gradient Boosting', 'Pandas', 'NumPy'],
    highlight: 'Anticipates industrial hardware breakdowns hours before failure occurs',
    visualType: 'iot-telemetry'
  },

  // ==========================================
  // DATA SCIENCE PROJECTS (6 - 10)
  // ==========================================
  {
    id: 6,
    title: 'Data Science – Retail Sales Forecasting & Inventory Optimization System',
    repo: 'Retail-Sales-Forecasting-Inventory-Optimization-System',
    category: 'Data Science',
    githubUrl: 'https://github.com/Saru2248/Retail-Sales-Forecasting-Inventory-Optimization-System',
    demoUrl: null,
    description:
      'An end-to-end data analytics and forecasting system designed to resolve inventory imbalances across multi-store retail operations. Combining statistical demand modeling with machine learning regression, the pipeline generates predictive sales forecasts, calculates safety stock levels and Economic Order Quantities (EOQ), and triggers automated reorder notifications to eliminate stockouts and reduce overstock storage costs across diverse product categories.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    highlight: 'Dynamic demand forecasting and automated EOQ safety stock calculation',
    visualType: 'chart'
  },
  {
    id: 7,
    title: 'Data Science – Climate Trend Analyzer',
    repo: 'Climate-Trend-Analyzer',
    category: 'Data Science',
    githubUrl: 'https://github.com/Saru2248/Climate-Trend-Analyzer',
    demoUrl: null,
    description:
      'An environmental analytics platform that analyzes historical meteorological datasets covering 29 major Indian cities across 27+ years and 270,000+ records. Built with Python and Streamlit, the system detects thermal anomalies, tracks shifting monsoon rainfall patterns, evaluates extreme climate events such as heatwaves and droughts, and renders interactive longitudinal trend models to forecast regional climate shifts.',
    techStack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'NumPy', 'Scikit-learn'],
    highlight: 'Processes 270,000+ climate records across 29 cities spanning 27+ years',
    visualType: 'chart'
  },
  {
    id: 8,
    title: 'Data Science – Employee Performance Predictor',
    repo: 'Employee-Performance-Predictor-using-Data-Analytics',
    category: 'Data Science',
    githubUrl: 'https://github.com/Saru2248/Employee-Performance-Predictor-using-Data-Analytics',
    demoUrl: null,
    description:
      'A human resources analytics pipeline that predicts workforce performance ratings and identifies critical productivity drivers using machine learning. The model processes comprehensive employee metrics, including training hours, project completion ratios, tenure, and department evaluations. Powered by Random Forest classification with feature importance analysis, it helps enterprise management identify promotion readiness and implement proactive employee retention strategies.',
    techStack: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'Matplotlib', 'Seaborn'],
    highlight: 'Data-driven HR predictive modeling to identify high performers and attrition risks',
    visualType: 'pipeline'
  },
  {
    id: 9,
    title: 'Data Science – Expense Tracker App',
    repo: 'Expense-Tracker-App-using-Data-Science',
    category: 'Data Science',
    githubUrl: 'https://github.com/Saru2248/Expense-Tracker-App-using-Data-Science',
    demoUrl: null,
    description:
      'An interactive personal finance data science application that ingests financial transaction records, cleans categorical spending data, and discovers behavioral spending trends. Featuring an interactive Streamlit and Plotly interface, the application delivers multi-tier budget tracking, monthly variance analysis, category-wise breakdowns, and rule-based overspending alerts to help users optimize personal capital allocation.',
    techStack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'NumPy'],
    highlight: 'Automated categorical spending analysis with variance trend detection',
    visualType: 'dashboard'
  },
  {
    id: 10,
    title: 'Data Science – Poll Results Visualizer',
    repo: 'Poll-Results-Visualizer',
    category: 'Data Science',
    githubUrl: 'https://github.com/Saru2248/Poll-Results-Visualizer',
    demoUrl: null,
    description:
      'A survey intelligence and data analytics dashboard built to analyze public opinion and demographic voting patterns. The tool processes survey responses, conducts demographic cross-tabulation, and models sentiment distributions across geographic segments. Through an interactive Streamlit UI with responsive Plotly visualizations, it converts raw survey responses into actionable strategic insights for research and decision analysts.',
    techStack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'NumPy'],
    highlight: 'Demographic cross-tabulation and sentiment mapping for survey analytics',
    visualType: 'chart'
  },

  // ==========================================
  // MACHINE LEARNING PROJECTS (11 - 15)
  // ==========================================
  {
    id: 11,
    title: 'Credit Card Fraud Detection System',
    repo: 'Credit-Card-Fraud-Detection-System',
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Saru2248/Credit-Card-Fraud-Detection-System',
    demoUrl: null,
    description:
      'An enterprise machine learning pipeline specialized in identifying fraudulent credit card transactions in heavily imbalanced financial datasets. The project uses SMOTE (Synthetic Minority Over-sampling Technique) to handle class imbalances and trains Random Forest and Logistic Regression models evaluated on Precision-Recall curves and ROC-AUC. It includes a live transaction simulation engine that flags suspicious purchases with sub-second inference.',
    techStack: ['Python', 'Scikit-learn', 'SMOTE', 'Random Forest', 'Pandas', 'NumPy'],
    highlight: 'Imbalanced dataset handling using SMOTE with high ROC-AUC precision',
    visualType: 'pipeline'
  },
  {
    id: 12,
    title: 'Customer Churn Prediction Model',
    repo: 'Customer-Churn-Prediction-Model',
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Saru2248/Customer-Churn-Prediction-Model',
    demoUrl: null,
    description:
      'An end-to-end customer retention modeling pipeline that predicts subscription and account cancellations before they occur. By analyzing customer tenure, contract types, service usage volume, and payment histories, the XGBoost classification model calculates individual churn probabilities. The system empowers customer success teams to deploy targeted retention campaigns and identify vulnerable revenue streams early.',
    techStack: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    highlight: 'Predicts subscription churn probabilities to trigger proactive retention',
    visualType: 'chart'
  },
  {
    id: 13,
    title: 'House Price Prediction using Regression',
    repo: 'House-Price-Prediction',
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Saru2248/House-Price-Prediction',
    demoUrl: null,
    description:
      'A residential property valuation system that models housing prices across Indian urban real estate markets using regression algorithms. The project implements data cleaning, outlier removal, and feature engineering for square footage, locality scores, and amenities. It compares Linear Regression, Decision Trees, Random Forests, and XGBoost models to provide accurate, data-backed real estate valuation estimates.',
    techStack: ['Python', 'XGBoost', 'Random Forest', 'Scikit-learn', 'Pandas', 'NumPy'],
    highlight: 'Multi-model comparative regression benchmark for residential property valuation',
    visualType: 'chart'
  },
  {
    id: 14,
    title: 'Social Media Sentiment Analysis Dashboard',
    repo: 'Social-Media-Sentiment-Analysis',
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Saru2248/Social-Media-Sentiment-Analysis',
    demoUrl: null,
    description:
      'A natural language processing pipeline and dashboard that monitors social media discourse, reviews, and tweets to classify sentiment into positive, negative, or neutral categories. The system incorporates text tokenization, stop-word removal, and TF-IDF vectorization paired with Logistic Regression classifiers, helping brand managers track customer perception and detect negative sentiment spikes in real time.',
    techStack: ['Python', 'NLTK', 'Scikit-learn', 'TF-IDF', 'Logistic Regression', 'Pandas'],
    highlight: 'Real-time text tokenization, TF-IDF vectorization, and multi-class sentiment classification',
    visualType: 'dashboard'
  },
  {
    id: 15,
    title: 'Student Performance Prediction System',
    repo: 'Student-Performance-Prediction-System',
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Saru2248/Student-Performance-Prediction-System',
    demoUrl: null,
    description:
      'An educational data analytics and regression system engineered to predict academic scores and detect at-risk students ahead of semester examinations. Training Random Forest Regressors on study hours, attendance ratios, sleep cycles, and prior assignments, the pipeline identifies non-linear dependencies and provides teachers with early intervention insights to customize student mentoring.',
    techStack: ['Python', 'Scikit-learn', 'Random Forest Regressor', 'Pandas', 'NumPy'],
    highlight: 'Academic score forecasting and early identification of vulnerable students',
    visualType: 'pipeline'
  },

  // ==========================================
  // PYTHON PROJECTS (16 - 20)
  // ==========================================
  {
    id: 16,
    title: 'Python – Automated Resume Screening Tool',
    repo: 'Automated-Resume-Screening-Tool',
    category: 'Python',
    githubUrl: 'https://github.com/Saru2248/Automated-Resume-Screening-Tool',
    demoUrl: null,
    description:
      'An AI-powered recruitment screening tool simulating modern Applicant Tracking Systems (ATS). The application processes resume text documents, performs natural language tokenization and lemmatization, and extracts key competencies. Using TF-IDF vectorization and cosine similarity scoring, it benchmarks candidate resumes against job requisitions to compute matching percentages and rank candidates efficiently.',
    techStack: ['Python', 'NLTK', 'Scikit-learn', 'TF-IDF', 'Pandas', 'NumPy'],
    highlight: 'Applicant Tracking System (ATS) resume-to-job matching with cosine similarity scoring',
    visualType: 'pipeline'
  },
  {
    id: 17,
    title: 'Python – Email Automation & Reminder System',
    repo: 'Email-automation-system',
    category: 'Python',
    githubUrl: 'https://github.com/Saru2248/Email-automation-system',
    demoUrl: null,
    description:
      'A production-ready workflow automation utility built with Python to schedule and deliver transactional notifications and bulk emails via SMTP protocols. The system reads recipient data from CSV and Excel spreadsheets, dynamically parses personalized template variables, manages attachment payloads, and executes timed background jobs with robust error handling, retry routines, and operational logging.',
    techStack: ['Python', 'smtplib', 'Schedule', 'Pandas', 'email.mime', 'Logging'],
    highlight: 'Automated SMTP email dispatching with personalized template parsing and scheduling',
    visualType: 'terminal'
  },
  {
    id: 18,
    title: 'Python – Stock Market Data Analyzer',
    repo: 'Stock-market-Analyzer',
    category: 'Python',
    githubUrl: 'https://github.com/Saru2248/Stock-market-Analyzer',
    demoUrl: null,
    description:
      'An algorithmic market intelligence terminal engineered to evaluate market trends, simulate trade orders, and compute equity analytics across global securities. Combining a high-performance Python FastAPI microservice with a responsive Next.js frontend, the platform processes time-series price data to render moving averages, relative strength indicators, and portfolio risk distributions asynchronously.',
    techStack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Recharts', 'REST API'],
    highlight: 'High-performance market intelligence terminal with asynchronous algorithmic metrics',
    visualType: 'dashboard'
  },
  {
    id: 19,
    title: 'Python – Weather Forecast & Alert Application',
    repo: 'Weather-Forecast-Alert-Application',
    category: 'Python',
    githubUrl: 'https://github.com/Saru2248/Weather-Forecast-Alert-Application',
    demoUrl: null,
    description:
      'A weather intelligence platform combining a FastAPI backend service with an interactive Streamlit UI to deliver meteorological analytics and automated weather alerts. Querying the Open-Meteo API, the platform provides temperature curves, precipitation likelihood, air quality indexes, and custom alert thresholds stored in an SQLite relational database.',
    techStack: ['Python 3.11', 'FastAPI', 'Streamlit', 'SQLite', 'Open-Meteo API', 'Pandas'],
    highlight: 'Real-time meteorological forecast pipeline with custom threshold trigger alerts',
    visualType: 'dashboard'
  },
  {
    id: 20,
    title: 'Python – Personal Expense Tracker with Database',
    repo: 'Personal-Expense-Tracker-with-Data-Visualization',
    category: 'Python',
    githubUrl: 'https://github.com/Saru2248/Personal-Expense-Tracker-with-Data-Visualization',
    demoUrl: null,
    description:
      'A personal financial analytics tool featuring an automated data pipeline and relational database storage. Built with Python, SQLite, and Streamlit, it ingests banking CSV exports, categorizes debit transactions, tracks recurring expense commitments, and visualizes cash flow dynamics through interactive Plotly vector charts to help users manage personal budgets.',
    techStack: ['Python 3.11+', 'Streamlit', 'SQLite', 'Plotly', 'Pandas', 'NumPy'],
    highlight: 'Persistent SQLite financial transaction tracking with dynamic Plotly visualizations',
    visualType: 'dashboard'
  },

  // ==========================================
  // FULL-STACK DEVELOPMENT PROJECTS (21 - 25)
  // ==========================================
  {
    id: 21,
    title: 'Full-Stack Development – Job Application Tracker Portal',
    repo: 'Job-Application-Tracker-Portal',
    category: 'Full-Stack Development',
    githubUrl: 'https://github.com/Saru2248/Job-Application-Tracker-Portal',
    demoUrl: null,
    description:
      'A modern Full-Stack MERN application engineered to streamline the end-to-end recruitment search process for job seekers. Featuring JWT authentication, RESTful APIs, and MongoDB schemas, the portal allows users to track submitted job applications, manage upcoming interview schedules, log recruiter contacts, and visualize application progression through customized Kanban-style status pipelines.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Axios', 'Tailwind CSS'],
    highlight: 'Centralized recruitment workflow management with status tracking and interview logs',
    visualType: 'code'
  },
  {
    id: 22,
    title: 'Full-Stack Development – Online Learning & Course Recommendation Platform',
    repo: 'AuraLearn-Online-Learning-Course-Recommendation-Platform',
    category: 'Full-Stack Development',
    githubUrl: 'https://github.com/Saru2248/AuraLearn-Online-Learning-Course-Recommendation-Platform',
    demoUrl: null,
    description:
      'A Full-Stack MERN EdTech platform that delivers structured online courses with personalized recommendation algorithms. AuraLearn features protected learner routes, modular course syllabi, interactive lesson tracking, and category-based skill matching. Built with a responsive glassmorphic UI, it provides authenticated dashboards for students to monitor lesson completion milestones in real time.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'BcryptJS'],
    highlight: 'Personalized course recommendation engine with modular syllabus milestone tracking',
    visualType: 'code'
  },
  {
    id: 23,
    title: 'Full-Stack Development – Smart Expense Tracker Web App',
    repo: 'SmartSpend-Smart-Expense-Tracker-Web-App',
    category: 'Full-Stack Development',
    githubUrl: 'https://github.com/Saru2248/SmartSpend-Smart-Expense-Tracker-Web-App',
    demoUrl: null,
    description:
      'A production-ready Full-Stack MERN personal finance web application built for budgeting and cash flow tracking. SmartSpend features secure JWT authentication, RESTful Express endpoints, and MongoDB Atlas data models. The responsive React frontend incorporates Chart.js visualizations to display spending breakdowns, transaction histories, and budget thresholds with real-time updates.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Chart.js', 'JWT', 'Axios'],
    highlight: 'Full-stack MERN finance manager with Chart.js vector budgeting charts',
    visualType: 'chart'
  },
  {
    id: 24,
    title: 'Full-Stack Development – Smart Grocery List & Inventory Manager',
    repo: 'Smart-Grocery-List-Inventory-Manager',
    category: 'Full-Stack Development',
    githubUrl: 'https://github.com/Saru2248/Smart-Grocery-List-Inventory-Manager',
    demoUrl: null,
    description:
      'A Full-Stack MERN application designed to manage household and commercial kitchen grocery supplies while minimizing food waste. The platform provides real-time pantry inventory tracking, expiration date monitoring, automated low-stock warnings, and dynamic shopping list generation. Built with responsive Tailwind CSS components, it simplifies inventory logistics across desktop and mobile devices.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS'],
    highlight: 'Automated low-stock threshold monitoring and dynamic shopping list generation',
    visualType: 'code'
  },
  {
    id: 25,
    title: 'Full-Stack Development – Community Discussion Forum with Real-Time Chat',
    repo: 'CommSphere-Community-Discussion-Forum-Real-Time-Chat',
    category: 'Full-Stack Development',
    githubUrl: 'https://github.com/Saru2248/CommSphere-Community-Discussion-Forum-Real-Time-Chat',
    demoUrl: null,
    description:
      'A Full-Stack MERN community platform combining persistent threaded discussion boards with synchronous live messaging channels. Built with Socket.IO, Express.js, and MongoDB, CommSphere enables users to create discussion topics, participate in community threads, post comments, and engage in real-time channel chats with instantaneous message delivery and JWT-secured access controls.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Tailwind CSS'],
    highlight: 'Synchronous live chat channels powered by Socket.IO with threaded forum discussions',
    visualType: 'chat'
  }
];

export const portfolioCategories = [
  'All',
  'AI',
  'Data Science',
  'Machine Learning',
  'Python',
  'Full-Stack Development'
];

