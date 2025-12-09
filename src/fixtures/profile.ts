import { Profile } from '../types';

const profile: Profile = {
    firstName: 'Jelani',
    lastName: 'Alexander',
    addressLine1: 'Tokyo, Japan',
    addressLine2: '',
    telephone: '',
    email: 'jelani@alexandercloudconsultant.com',
    description:
        'Multi-Cloud Certified Engineer (AWS, Azure, GCP, Oracle) specializing in DevOps, Cloud Security (CCSK), and Infrastructure Automation. Experienced in CI/CD pipelines, Terraform, Kubernetes, and Docker. Passionate about building secure, scalable cloud solutions.',
    socials: [
        { name: 'https://www.linkedin.com/in/jelani-alexander/', icon: 'linkedin-in' },
        { name: 'https://github.com/AlexJelani', icon: 'github' },
        { name: '', icon: 'twitter' },
        { name: '', icon: 'facebook-f' }
    ]
};

export default profile;
