import React, { useState, useEffect } from 'react';

interface Quiz {
  question: string;
  options: string[];
  answer: number;
}

interface ExerciseItem {
  scenario: string;
  expectedCommand: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: Quiz[];
  exercises: ExerciseItem[];
}

interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  description?: string;
}

const fundamentals: Lesson[] = [
  {
    id: 'fund-1',
    title: 'Introduction to Docker',
    content: `
      <p>Docker is a platform for developing, shipping, and running applications inside containers. 
      Containers are lightweight, portable, and ensure consistency across environments.</p>
      <p>Key benefits of Docker include:</p>
      <ul>
        <li>Isolation of applications</li>
        <li>Portability across machines and cloud providers</li>
        <li>Version control of images</li>
        <li>Resource efficiency compared to VMs</li>
      </ul>
    `,
    quiz: [
      {
        question: 'What is a key benefit of Docker containers?',
        options: [
          'They run faster than code locally',
          'They isolate applications and dependencies',
          'They replace the need for programming',
          'They automatically scale applications'
        ],
        answer: 1
      }
    ],
    exercises: [
      {
        scenario: 'Check if Docker is installed on your machine.',
        expectedCommand: 'docker --version'
      }
    ]
  },
  {
    id: 'fund-2',
    title: 'Docker Architecture',
    content: `
      <p>Docker architecture consists of:</p>
      <ul>
        <li><strong>Docker Engine:</strong> Core component that builds and runs containers</li>
        <li><strong>Docker Daemon:</strong> Background service managing images, containers, and volumes</li>
        <li><strong>Docker Client:</strong> Command-line tool (CLI) to communicate with Docker Daemon</li>
        <li><strong>Docker Registry:</strong> Repository for storing and distributing Docker images (e.g., Docker Hub)</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which component communicates with the Docker Daemon?',
        options: [
          'Docker Registry',
          'Docker Engine',
          'Docker Client',
          'Container Runtime'
        ],
        answer: 2
      }
    ],
    exercises: [
      {
        scenario: 'List all running Docker containers.',
        expectedCommand: 'docker ps'
      }
    ]
  },
  {
    id: 'fund-3',
    title: 'Docker Images vs Containers',
    content: `
      <p>Docker Images are read-only templates used to create containers.</p>
      <p>Docker Containers are running instances of images.</p>
      <ul>
        <li>Images: static, versioned, reusable</li>
        <li>Containers: dynamic, isolated, can be started/stopped/deleted</li>
      </ul>
      <p>Example commands:</p>
      <pre>
docker pull nginx        # download nginx image
docker run nginx         # start container from image
docker ps                # list
      </pre>
    `,
    quiz: [
      {
        question: 'What is the difference between a Docker image and a container?',
        options: [
          'Images run, containers are templates',
          'Images are templates, containers are running instances',
          'No difference',
          'Containers are static'
        ],
        answer: 1
      }
    ],
    exercises: [
      {
        scenario: 'Pull the nginx image and run a container from it.',
        expectedCommand: 'docker pull nginx\ndocker run -d nginx'
      }
    ]
  },
  {
    id: 'fund-4',
    title: 'Docker Commands Basics',
    content: `
      <p>Some essential Docker commands:</p>
      <ul>
        <li><strong>docker build</strong> - Build an image from a Dockerfile</li>
        <li><strong>docker run</strong> - Run a container from an image</li>
        <li><strong>docker ps</strong> - List running containers</li>
        <li><strong>docker stop</strong> - Stop a running container</li>
        <li><strong>docker rm</strong> - Remove a container</li>
        <li><strong>docker rmi</strong> - Remove an image</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command is used to remove an image?',
        options: ['docker rm', 'docker rmi', 'docker stop', 'docker run'],
        answer: 1
      }
    ],
    exercises: [
      {
        scenario: 'Build an image from Dockerfile located in the current directory.',
        expectedCommand: 'docker build -t myimage .'
      }
    ]
  },
  {
    id: 'fund-5',
    title: 'Dockerfile Basics',
    content: `
      <h2>Dockerfile Basics</h2>
      <p>Dockerfile defines how to build a Docker image.</p>
      <ul>
        <li>FROM: base image</li>
        <li>RUN: execute commands</li>
        <li>COPY / ADD: copy files into the image</li>
        <li>EXPOSE: define container ports</li>
        <li>CMD / ENTRYPOINT: default command to run</li>
      </ul>
      <p>Example:</p>
      <pre>
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nginx
COPY index.html /var/www/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
      </pre>
    `,
    quiz: [
      {
        question: 'Which instruction specifies the base image?',
        options: ['RUN', 'FROM', 'CMD', 'EXPOSE'],
        answer: 1
      }
    ],
    exercises: [
      {
        scenario: 'Create a Dockerfile that installs nginx and exposes port 80.',
        expectedCommand: 'See Dockerfile example above'
      }
    ]
  },
  {
    id: 'fund-6',
    title: 'Basic Container Operations',
    content: `
      <h2>Basic Container Operations</h2>
      <ul>
        <li>docker start / stop / restart</li>
        <li>docker exec -it container /bin/bash</li>
        <li>docker logs container</li>
        <li>docker inspect container</li>
        <li>docker rm container</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command allows you to start a stopped container?',
        options: ['docker run', 'docker build', 'docker start', 'docker exec'],
        answer: 2
      }
    ],
    exercises: [
      {
        scenario: 'Start a stopped container named "exam-container" and access its shell.',
        expectedCommand: 'docker start exam-container\ndocker exec -it exam-container /bin/bash'
      }
    ]
  }
];

const images: Lesson[] = [
  {
    id: 'img-01',
    title: 'Introduction to Docker Images',
    content: `
      <h2>Introduction to Docker Images</h2>
      <p>Docker images are <strong>read-only templates</strong> used to create containers.</p>
      <p>Key points:</p>
      <ul>
        <li>Images consist of layers stacked on top of each other.</li>
        <li>Each layer represents a filesystem change (e.g., adding files).</li>
        <li>Images are immutable once created.</li>
        <li>Images are stored in <strong>registries</strong> such as Docker Hub.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which statement is true about Docker images?',
        options: [
          'They are mutable at runtime',
          'They are read-only templates for containers',
          'They run directly on the host',
          'They store container logs'
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'List all images on your system.',
        expectedCommand: 'docker images',
      },
    ],
  },
  {
    id: 'img-02',
    title: 'Dockerfile Basics',
    content: `
      <h2>Dockerfile Basics</h2>
      <p>A Dockerfile is a text file with instructions to build a Docker image.</p>
      <p>Common instructions:</p>
      <ul>
        <li><code>FROM</code> - Base image</li>
        <li><code>RUN</code> - Execute commands during build</li>
        <li><code>COPY</code> - Copy files from host into image</li>
        <li><code>WORKDIR</code> - Set working directory</li>
        <li><code>CMD</code> - Default command to run</li>
        <li><code>EXPOSE</code> - Port the container listens on</li>
      </ul>
      <p>Example:</p>
      <pre>
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY . /app
CMD ["bash"]
      </pre>
    `,
    quiz: [
      {
        question: 'Which instruction sets the base image in a Dockerfile?',
        options: ['RUN', 'FROM', 'COPY', 'CMD'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Write a Dockerfile starting from ubuntu:22.04 and installing curl.',
        expectedCommand: 'FROM ubuntu:22.04\nRUN apt-get update && apt-get install -y curl',
      },
    ],
  },
  {
    id: 'img-03',
    title: 'Building Docker Images',
    content: `
      <h2>Building Docker Images</h2>
      <p>Build images using the <code>docker build</code> command.</p>
      <ul>
        <li>Command: <code>docker build -t myimage:latest .</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command builds a Docker image?',
        options: ['docker run', 'docker build -t myimage .', 'docker pull', 'docker push'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Build an image tagged "exam-image" from the current directory.',
        expectedCommand: 'docker build -t exam-image .',
      },
    ],
  },
  {
    id: 'img-04',
    title: 'Tagging and Pushing Images',
    content: `
      <h2>Tagging and Pushing Images</h2>
      <ul>
        <li>Tag an image: <code>docker tag myimage:latest myrepo/myimage:v1</code></li>
        <li>Push to registry: <code>docker push myrepo/myimage:v1</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command pushes an image to Docker Hub?',
        options: ['docker tag', 'docker pull', 'docker push myimage', 'docker build'],
        answer: 2,
      },
    ],
    exercises: [
      {
        scenario: 'Tag "myapp" as "yourdockerid/myapp:v1" and push to Docker Hub.',
        expectedCommand: 'docker tag myapp yourdockerid/myapp:v1\ndocker push yourdockerid/myapp:v1',
      },
    ],
  },
  {
    id: 'img-05',
    title: 'Multi-Stage Builds',
    content: `
      <h2>Multi-Stage Builds</h2>
      <p>Use multi-stage builds to optimize image size by separating build and runtime environments.</p>
      <pre>
FROM golang:alpine AS builder
ADD . /src
RUN cd /src && go build -o /app
FROM alpine
COPY --from=builder /app /app
ENTRYPOINT ["/app"]
      </pre>
    `,
    quiz: [
      {
        question: 'What is the benefit of multi-stage builds?',
        options: ['Larger images', 'Smaller final images', 'Slower builds', 'No caching'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Write a multi-stage Dockerfile for a Go app.',
        expectedCommand: 'See example above',
      },
    ],
  },
  {
    id: 'img-06',
    title: 'Cleaning Images',
    content: `
      <h2>Cleaning Images</h2>
      <ul>
        <li>Remove unused images: <code>docker image prune</code></li>
        <li>Remove all unused images, containers, networks: <code>docker system prune</code></li>
        <li>Remove specific image: <code>docker rmi image_id</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command removes all dangling images?',
        options: [
          'docker rmi image_id',
          'docker image prune',
          'docker ps -a',
          'docker rm container_id',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Remove all dangling images from your system.',
        expectedCommand: 'docker image prune',
      },
    ],
  },
  {
    id: 'img-07',
    title: 'Inspecting Docker Images',
    content: `
      <h2>Inspecting Docker Images</h2>
      <p>You can inspect image metadata and history to understand its layers and configuration.</p>
      <ul>
        <li><code>docker inspect image_name</code> - Show detailed info about the image</li>
        <li><code>docker history image_name</code> - Show layer history</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command shows the layers of an image?',
        options: [
          'docker inspect image_name',
          'docker history image_name',
          'docker ps',
          'docker images',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Inspect the image "nginx" and view its layers.',
        expectedCommand: 'docker inspect nginx\ndocker history nginx',
      },
    ],
  },
  {
    id: 'img-08',
    title: 'Build Caching',
    content: `
      <h2>Docker Build Caching</h2>
      <p>Docker caches layers during builds to speed up subsequent builds.</p>
      <ul>
        <li>Use <code>--no-cache</code> to rebuild from scratch.</li>
        <li>Use <code>--cache-from</code> to leverage cache from other images.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which option disables Docker build cache?',
        options: ['--cache-from', '--no-cache', '--pull', '--rm'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Build an image without using cache.',
        expectedCommand: 'docker build --no-cache -t myimage .',
      },
    ],
  },
];

const networking: Lesson[] = [
  {
    id: 'net-01',
    title: 'Introduction to Docker Networking',
    content: `
      <h2>Introduction to Docker Networking</h2>
      <p>Docker provides isolated networks for containers to communicate with each other and the host.</p>
      <p>Key concepts:</p>
      <ul>
        <li>Containers communicate using IP addresses and ports.</li>
        <li>Docker networks provide isolation and service discovery.</li>
        <li>Network types: <strong>bridge, host, overlay, macvlan</strong>.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which Docker feature isolates container networks?',
        options: ['Volumes', 'Networks', 'Images', 'Docker Hub'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'List all networks on your system.',
        expectedCommand: 'docker network ls',
      },
    ],
  },
  {
    id: 'net-02',
    title: 'Bridge Network',
    content: `
      <h2>Bridge Network</h2>
      <p>Bridge is the default network for containers.</p>
      <ul>
        <li>Each container gets an IP on the bridge network.</li>
        <li>Containers can communicate via IP or container name.</li>
        <li>Create a custom bridge: <code>docker network create my-bridge</code></li>
      </ul>
      <pre>
docker network create my-bridge
docker run -dit --name web --network my-bridge nginx
docker run -dit --name db --network my-bridge mysql
      </pre>
    `,
    quiz: [
      {
        question: 'What is the default network type for Docker containers?',
        options: ['Overlay', 'Host', 'Bridge', 'Macvlan'],
        answer: 2,
      },
    ],
    exercises: [
      {
        scenario: 'Create a custom bridge network named "exam-bridge".',
        expectedCommand: 'docker network create exam-bridge',
      },
    ],
  },
  {
    id: 'net-03',
    title: 'Host Network',
    content: `
      <h2>Host Network</h2>
      <p>Host network uses the host's networking directly.</p>
      <ul>
        <li>No network isolation; container shares host IP.</li>
        <li>Use host networking for performance-sensitive apps.</li>
      </ul>
      <pre>
docker run -dit --name web --network host nginx
      </pre>
    `,
    quiz: [
      {
        question: 'Which statement about host network is true?',
        options: [
          'It isolates the container from the host',
          'The container shares host network directly',
          'It is the default network',
          'It is only used for overlay networks',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run a container using host network.',
        expectedCommand: 'docker run -dit --network host nginx',
      },
    ],
  },
  {
    id: 'net-04',
    title: 'Overlay Network',
    content: `
      <h2>Overlay Network</h2>
      <p>Overlay networks are used for multi-host communication in Swarm mode.</p>
      <ul>
        <li>Create overlay network: <code>docker network create -d overlay my-overlay</code></li>
        <li>Containers on different hosts can communicate seamlessly.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'When is overlay network typically used?',
        options: [
          'Single host',
          'Multi-host Swarm clusters',
          'Host networking',
          'Macvlan networks',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create an overlay network named "exam-overlay".',
        expectedCommand: 'docker network create -d overlay exam-overlay',
      },
    ],
  },
  {
    id: 'net-05',
    title: 'Macvlan Network',
    content: `
      <h2>Macvlan Network</h2>
      <p>Macvlan allows containers to have their own MAC address on the host network.</p>
      <ul>
        <li>Create macvlan network: <code>docker network create -d macvlan --subnet=192.168.1.0/24 my-macvlan</code></li>
        <li>Containers appear as physical devices on the network.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'What does Macvlan provide to containers?',
        options: [
          'Shared host IP',
          'Own MAC address on host network',
          'Overlay for Swarm',
          'Default bridge',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create a macvlan network with subnet 192.168.1.0/24.',
        expectedCommand: 'docker network create -d macvlan --subnet=192.168.1.0/24 exam-macvlan',
      },
    ],
  },
  {
    id: 'net-06',
    title: 'Port Mapping and Linking',
    content: `
      <h2>Port Mapping and Linking</h2>
      <p>Map container ports to host ports:</p>
      <pre>
docker run -dit -p 8080:80 nginx
      </pre>
      <p>Link containers (legacy, mostly replaced by networks):</p>
      <pre>
docker run -dit --name web nginx
docker run -dit --name app --link web:web myapp
      </pre>
    `,
    quiz: [
      {
        question: 'Which option exposes a container port to the host?',
        options: ['-v', '-p', '--network', '--link'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run an nginx container and map host port 8080 to container port 80.',
        expectedCommand: 'docker run -dit -p 8080:80 nginx',
      },
    ],
  },
  {
    id: 'net-07',
    title: 'Troubleshooting Networks',
    content: `
      <h2>Troubleshooting Docker Networks</h2>
      <ul>
        <li>Inspect network details: <code>docker network inspect my-network</code></li>
        <li>Check container IP: <code>docker inspect -f '{{ .NetworkSettings.IPAddress }}' container_name</code></li>
        <li>Ping between containers: <code>docker exec -it container_name ping other_container</code></li>
        <li>Remove unused networks: <code>docker network prune</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command shows detailed info about a network?',
        options: [
          'docker network ls',
          'docker network inspect my-network',
          'docker ps',
          'docker logs container',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Inspect the custom bridge network "exam-bridge".',
        expectedCommand: 'docker network inspect exam-bridge',
      },
    ],
  },
  {
    id: 'net-08',
    title: 'Custom DNS and Aliases',
    content: `
      <h2>Custom DNS and Container Aliases</h2>
      <p>Docker allows configuring DNS and container aliases for better service discovery:</p>
      <ul>
        <li>Set custom DNS servers: <code>--dns 8.8.8.8</code></li>
        <li>Assign aliases to containers in user-defined networks using <code>--network-alias</code>.</li>
      </ul>
      <pre>
docker network create my-net
docker run -dit --name web --network my-net --network-alias frontend nginx
docker run -dit --name app --network my-net ping frontend
      </pre>
    `,
    quiz: [
      {
        question: 'Which flag sets a container alias in a network?',
        options: ['--alias', '--network-alias', '--name', '--link'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run a container with network alias "backend" in network "exam-net".',
        expectedCommand: 'docker run -dit --name db --network exam-net --network-alias backend mysql',
      },
    ],
  },
];

const security: Lesson[] = [
  {
    id: 'sec-01',
    title: 'Introduction to Docker Security',
    content: `
      <h2>Introduction to Docker Security</h2>
      <p>Docker containers share the host OS kernel. Security is essential to prevent unauthorized access and vulnerabilities.</p>
      <ul>
        <li>Run containers with least privilege.</li>
        <li>Use trusted images from official registries.</li>
        <li>Regularly scan images for vulnerabilities.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Why is Docker security important?',
        options: [
          'Containers run directly on hardware',
          'Containers share the host OS kernel and may be exploited',
          'Containers cannot use images',
          'Docker does not provide security tools',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'List all running containers and their user IDs.',
        expectedCommand: 'docker ps -q | xargs docker inspect --format \'{{ .Name }} {{ .Config.User }}\'',
      },
    ],
  },
  {
    id: 'sec-02',
    title: 'Running Containers as Non-Root User',
    content: `
      <h2>Running Containers as Non-Root</h2>
      <p>Best practice: avoid running containers as root inside the container.</p>
      <ul>
        <li>Specify user in Dockerfile: <code>USER appuser</code></li>
        <li>Or override at runtime: <code>docker run -u 1001 myimage</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you run a container as a specific user?',
        options: [
          'docker run -u 1001 myimage',
          'docker run --privileged myimage',
          'docker run -v /data myimage',
          'docker network create mynet',
        ],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'Run a container as user with UID 1001.',
        expectedCommand: 'docker run -dit -u 1001 ubuntu',
      },
    ],
  },
  {
    id: 'sec-03',
    title: 'Docker Secrets',
    content: `
      <h2>Docker Secrets</h2>
      <p>Used to securely store sensitive data like passwords and API keys.</p>
      <ul>
        <li>Create a secret: <code>echo "mypassword" | docker secret create db_password -</code></li>
        <li>Use secret in Swarm service: <code>docker service create --name db --secret db_password mysql</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'What is Docker Secret used for?',
        options: [
          'Mounting volumes',
          'Storing sensitive data securely',
          'Running containers faster',
          'Networking between hosts',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create a secret named "db_password".',
        expectedCommand: 'echo "mypassword" | docker secret create db_password -',
      },
    ],
  },
  {
    id: 'sec-04',
    title: 'Image Signing and Verification',
    content: `
      <h2>Image Signing and Verification</h2>
      <p>Docker Content Trust (DCT) allows you to sign images and verify integrity.</p>
      <ul>
        <li>Enable DCT: <code>export DOCKER_CONTENT_TRUST=1</code></li>
        <li>Pull signed image: <code>docker pull myimage</code></li>
        <li>Only verified images will be pulled.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'What does Docker Content Trust provide?',
        options: [
          'Faster image builds',
          'Verified image integrity and authenticity',
          'Container networking',
          'Volume management',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Enable Docker Content Trust and pull an image.',
        expectedCommand: 'export DOCKER_CONTENT_TRUST=1\ndocker pull alpine',
      },
    ],
  },
  {
    id: 'sec-05',
    title: 'Scanning Images for Vulnerabilities',
    content: `
      <h2>Scanning Docker Images</h2>
      <p>Scan images for known vulnerabilities to reduce security risks.</p>
      <ul>
        <li>Docker Hub automated scanning or third-party tools (e.g., Trivy, Clair).</li>
        <li>Example using Trivy:</li>
      </ul>
      <pre>
trivy image myimage:latest
      </pre>
    `,
    quiz: [
      {
        question: 'Which tool can scan Docker images for vulnerabilities?',
        options: ['Trivy', 'docker network ls', 'docker run', 'docker volume ls'],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'Scan the "alpine:latest" image using Trivy.',
        expectedCommand: 'trivy image alpine:latest',
      },
    ],
  },
  {
    id: 'sec-06',
    title: 'Security Best Practices',
    content: `
      <h2>Docker Security Best Practices</h2>
      <ul>
        <li>Use minimal base images.</li>
        <li>Run containers as non-root users.</li>
        <li>Keep images updated.</li>
        <li>Limit container capabilities with <code>--cap-drop</code>.</li>
        <li>Use read-only filesystem for containers if possible: <code>--read-only</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which is a recommended Docker security best practice?',
        options: [
          'Run all containers as root',
          'Use minimal images and non-root users',
          'Disable Docker updates',
          'Store secrets in environment variables',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run a container with read-only filesystem and drop all capabilities.',
        expectedCommand: 'docker run -dit --read-only --cap-drop ALL ubuntu',
      },
    ],
  },
];

const storage: Lesson[] = [
  {
    id: 'storage-01',
    title: 'Introduction to Docker Storage',
    content: `
      <h2>Introduction to Docker Storage</h2>
      <p>Containers are ephemeral by default. Data inside a container disappears when it stops unless persisted.</p>
      <p>To persist data, Docker provides:</p>
      <ul>
        <li><strong>Volumes</strong>: Managed by Docker and stored in <code>/var/lib/docker/volumes/</code>.</li>
        <li><strong>Bind mounts</strong>: Map host directories into containers.</li>
        <li><strong>Tmpfs mounts</strong>: Store data in memory (RAM).</li>
      </ul>
      <p>Understanding storage is essential for data persistence, backups, and security.</p>
    `,
    quiz: [
      {
        question: 'Why is container storage ephemeral by default?',
        options: [
          'Because containers share the host filesystem',
          'Because containers are immutable and disappear when stopped',
          'Because Docker does not allow writing files',
          'Because images store all data permanently',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'List all Docker volumes on your system.',
        expectedCommand: 'docker volume ls',
      },
    ],
  },
  {
    id: 'storage-02',
    title: 'Volumes',
    content: `
      <h2>Docker Volumes</h2>
      <p>Volumes are the preferred mechanism for persistent storage in Docker.</p>
      <ul>
        <li>Created with: <code>docker volume create my-volume</code></li>
        <li>Mounted to a container: <code>docker run -dit -v my-volume:/data ubuntu</code></li>
        <li>Can be shared between multiple containers.</li>
        <li>Anonymous volumes are created automatically when no name is provided: <code>docker run -v /data ubuntu</code></li>
        <li>Volumes can be mounted read-only: <code>docker run -v my-volume:/data:ro ubuntu</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command creates a Docker volume?',
        options: [
          'docker run -v my-volume:/data',
          'docker volume create my-volume',
          'docker volume mount my-volume',
          'docker create volume my-volume',
        ],
        answer: 1,
      },
      {
        question: 'What is an anonymous volume?',
        options: [
          'A volume created automatically without a name',
          'A read-only volume',
          'A volume shared across hosts',
          'A temporary in-memory volume',
        ],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'Create a volume named "exam-vol" and mount it to /data in an Ubuntu container.',
        expectedCommand: 'docker volume create exam-vol\ndocker run -dit -v exam-vol:/data ubuntu',
      },
    ],
  },
  {
    id: 'storage-03',
    title: 'Bind Mounts',
    content: `
      <h2>Bind Mounts</h2>
      <p>Bind mounts map a host directory or file into a container.</p>
      <ul>
        <li>Command: <code>docker run -dit -v /host/path:/container/path ubuntu</code></li>
        <li>Useful for development, allowing live code changes.</li>
      </ul>
      <pre>
docker run -dit -v /home/user/app:/app ubuntu
      </pre>
    `,
    quiz: [
      {
        question: 'Which statement about bind mounts is correct?',
        options: [
          'They are managed by Docker and stored in /var/lib/docker/volumes/',
          'They map a host directory to a container directory',
          'They cannot persist data across containers',
          'They are read-only by default',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Mount host directory /tmp/data to /data in a container.',
        expectedCommand: 'docker run -dit -v /tmp/data:/data ubuntu',
      },
    ],
  },
  {
    id: 'storage-04',
    title: 'Tmpfs Mounts',
    content: `
      <h2>Tmpfs Mounts</h2>
      <p>Tmpfs mounts store data in host memory (RAM), not on disk.</p>
      <ul>
        <li>Useful for sensitive or temporary data.</li>
        <li>Data is cleared when the container stops.</li>
        <li>Command example: <code>docker run -dit --tmpfs /run ubuntu</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Where is data stored in a tmpfs mount?',
        options: ['Disk', 'RAM', 'Docker Hub', 'Volume directory'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run a container with tmpfs mounted at /tmp.',
        expectedCommand: 'docker run -dit --tmpfs /tmp ubuntu',
      },
    ],
  },
  {
    id: 'storage-05',
    title: 'Inspecting and Cleaning Volumes',
    content: `
      <h2>Inspecting and Cleaning Volumes</h2>
      <ul>
        <li>Inspect a volume: <code>docker volume inspect my-volume</code></li>
        <li>Remove a volume: <code>docker volume rm my-volume</code></li>
        <li>Remove unused volumes: <code>docker volume prune</code></li>
        <li>Useful for troubleshooting data persistence issues.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command removes all unused volumes?',
        options: [
          'docker volume rm',
          'docker volume prune',
          'docker system prune',
          'docker rm container',
        ],
        answer: 1,
      },
      {
        question: 'How can you inspect the details of a volume?',
        options: [
          'docker inspect volume_name',
          'docker volume inspect volume_name',
          'docker run -v volume_name:/data',
          'docker system info',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Inspect a volume named "exam-vol".',
        expectedCommand: 'docker volume inspect exam-vol',
      },
      {
        scenario: 'Remove all unused volumes on the system.',
        expectedCommand: 'docker volume prune',
      },
    ],
  },
];

const orchestration: Lesson[] = [
  {
    id: 'orch-01',
    title: 'Introduction to Docker Orchestration',
    content: `
      <h2>Introduction to Docker Orchestration</h2>
      <p>Orchestration manages multiple containers across one or more hosts.</p>
      <ul>
        <li>Automates deployment, scaling, and management of containers.</li>
        <li>Docker Swarm is Docker’s built-in orchestration tool.</li>
        <li>Compose defines multi-container applications.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'What is the main purpose of container orchestration?',
        options: [
          'Build container images',
          'Run single containers',
          'Automate deployment, scaling, and management of multiple containers',
          'Monitor disk usage',
        ],
        answer: 2,
      },
    ],
    exercises: [
      {
        scenario: 'Check if Docker Swarm is active on your host.',
        expectedCommand: 'docker info | grep Swarm',
      },
    ],
  },
  {
    id: 'orch-02',
    title: 'Docker Swarm Basics',
    content: `
      <h2>Docker Swarm Basics</h2>
      <ul>
        <li>Initialize Swarm: <code>docker swarm init</code></li>
        <li>Join a node: <code>docker swarm join --token TOKEN HOST:PORT</code></li>
        <li>Node roles: manager vs worker</li>
        <li>List nodes: <code>docker node ls</code></li>
        <li>Swarm provides built-in TLS security for node communication.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which node role manages the cluster state in Swarm?',
        options: ['Worker', 'Manager', 'Leader', 'Agent'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Initialize a Swarm on your host and list nodes.',
        expectedCommand: 'docker swarm init\ndocker node ls',
      },
    ],
  },
  {
    id: 'orch-03',
    title: 'Docker Services',
    content: `
      <h2>Docker Services</h2>
      <p>Services run containers in Swarm mode with desired state management.</p>
      <ul>
        <li>Create a service: <code>docker service create --name web nginx</code></li>
        <li>Scale a service: <code>docker service scale web=3</code></li>
        <li>Inspect a service: <code>docker service ps web</code></li>
        <li>Service constraints: <code>--constraint node.role==manager</code></li>
        <li>Health checks and restart policies can be defined for services.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you scale a service to 5 replicas?',
        options: [
          'docker scale web=5',
          'docker service scale web=5',
          'docker run --replicas 5',
          'docker compose scale web=5',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create a service named "web" with nginx and scale to 2 replicas.',
        expectedCommand: 'docker service create --name web nginx\ndocker service scale web=2',
      },
    ],
  },
  {
    id: 'orch-04',
    title: 'Swarm Stacks',
    content: `
      <h2>Swarm Stacks</h2>
      <p>Stacks deploy multi-service apps using Compose files in Swarm.</p>
      <ul>
        <li>Deploy stack: <code>docker stack deploy -c docker-compose.yml mystack</code></li>
        <li>List stacks: <code>docker stack ls</code></li>
        <li>Remove stack: <code>docker stack rm mystack</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command deploys a stack using a Compose file?',
        options: [
          'docker service deploy',
          'docker stack deploy -c docker-compose.yml mystack',
          'docker swarm deploy',
          'docker compose up',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Deploy a stack "exam-stack" using a Compose file and list its services.',
        expectedCommand: 'docker stack deploy -c docker-compose.yml exam-stack\ndocker stack services exam-stack',
      },
    ],
  },
  {
    id: 'orch-05',
    title: 'Rolling Updates and Rollbacks',
    content: `
      <h2>Rolling Updates and Rollbacks</h2>
      <ul>
        <li>Update service: <code>docker service update --image newimage web</code></li>
        <li>Control update: <code>--update-parallelism 2 --update-delay 10s</code></li>
        <li>Rollback: <code>docker service rollback web</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you rollback a service update?',
        options: [
          'docker service update --rollback',
          'docker service rollback web',
          'docker stack rollback',
          'docker compose rollback',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Update a service "web" to a new image with rolling update.',
        expectedCommand: 'docker service update --image nginx:new web',
      },
    ],
  },
  {
    id: 'orch-06',
    title: 'Docker Compose v2 Basics',
    content: `
      <h2>Docker Compose v2 Basics</h2>
      <ul>
        <li>Compose defines multi-container apps in YAML.</li>
        <li>Start services: <code>docker compose up -d</code></li>
        <li>Stop services: <code>docker compose down</code></li>
        <li>View logs: <code>docker compose logs -f</code></li>
        <li>Inspect running services: <code>docker compose ps</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command starts services defined in docker-compose.yml using Compose v2?',
        options: [
          'docker stack deploy',
          'docker compose up -d',
          'docker run compose',
          'docker service create',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run a Compose file in detached mode using Compose v2 syntax.',
        expectedCommand: 'docker compose up -d',
      },
    ],
  },
  {
    id: 'orch-07',
    title: 'Secrets and Configs',
    content: `
      <h2>Secrets and Configs</h2>
      <ul>
        <li>Create a secret: <code>echo "mypassword" | docker secret create db_password -</code></li>
        <li>Use a secret in a service: <code>--secret db_password</code></li>
        <li>Create a config: <code>docker config create app_config config.yml</code></li>
        <li>Use a config in a service: <code>--config app_config</code></li>
        <li>Secrets and configs are encrypted and stored in Swarm managers.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you use a secret in a service?',
        options: [
          '--env secret_name',
          '--secret secret_name',
          '--config secret_name',
          '--volume secret_name',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create a secret "db_password" and attach it to a service.',
        expectedCommand: 'echo "mypassword" | docker secret create db_password -\ndocker service create --name secret-service --secret db_password nginx',
      },
    ],
  },
];

const troubleshooting: Lesson[] = [
  {
    id: 'trbl-01',
    title: 'Introduction to Troubleshooting',
    content: `
      <h2>Introduction to Docker Troubleshooting</h2>
      <p>Effective troubleshooting is critical for container reliability and for passing the DCA exam.</p>
      <ul>
        <li>Inspect container logs to identify errors</li>
        <li>Check container status and resource usage</li>
        <li>Inspect images, volumes, and networks</li>
        <li>Debug network connectivity issues</li>
      </ul>
      <p>Understanding these steps ensures smooth container operation and maintenance.</p>
    `,
    quiz: [
      {
        question: 'Why is troubleshooting important in Docker?',
        options: [
          'It improves container performance',
          'It helps identify and resolve issues to maintain container availability',
          'It reduces image size',
          'It increases CPU usage',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Check the status of all running and stopped containers.',
        expectedCommand: 'docker ps -a',
      },
    ],
  },
  {
    id: 'trbl-02',
    title: 'Inspecting Container Logs',
    content: `
      <h2>Inspecting Container Logs</h2>
      <p>Container logs are the first source of information for debugging.</p>
      <ul>
        <li>View logs: <code>docker logs container_name</code></li>
        <li>Follow logs in real-time: <code>docker logs -f container_name</code></li>
        <li>Limit output lines: <code>docker logs --tail 50 container_name</code></li>
        <li>Combine with <code>grep</code> to filter messages.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command follows a container\'s logs in real-time?',
        options: [
          'docker logs container_name',
          'docker logs -f container_name',
          'docker inspect container_name',
          'docker ps -f container_name',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Follow logs for a container named "exam-app".',
        expectedCommand: 'docker logs -f exam-app',
      },
    ],
  },
  {
    id: 'trbl-03',
    title: 'Inspecting Containers',
    content: `
      <h2>Inspecting Containers</h2>
      <ul>
        <li>Inspect container details: <code>docker inspect container_name</code></li>
        <li>Check real-time resource usage: <code>docker stats container_name</code></li>
        <li>View top processes in a container: <code>docker top container_name</code></li>
        <li>Helpful for identifying misconfigurations and resource bottlenecks.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command shows resource usage for a container?',
        options: [
          'docker inspect',
          'docker stats container_name',
          'docker logs',
          'docker ps',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Inspect container "exam-app" and check its resource usage.',
        expectedCommand: 'docker inspect exam-app\ndocker stats exam-app',
      },
    ],
  },
  {
    id: 'trbl-04',
    title: 'Common Network Issues',
    content: `
      <h2>Common Network Issues</h2>
      <ul>
        <li>Inspect networks: <code>docker network inspect my-network</code></li>
        <li>Check container IP: <code>docker inspect -f \'{{ .NetworkSettings.IPAddress }}\' container_name</code></li>
        <li>Test connectivity: <code>docker exec -it container ping other_container</code></li>
        <li>Verify port mapping: <code>docker port container_name</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you check a container\'s IP address?',
        options: [
          'docker network ls',
          'docker inspect -f \'{{ .NetworkSettings.IPAddress }}\' container_name',
          'docker logs container_name',
          'docker stats container_name',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Inspect network "exam-net" and ping between two containers.',
        expectedCommand: 'docker network inspect exam-net\ndocker exec -it container1 ping container2',
      },
    ],
  },
  {
    id: 'trbl-05',
    title: 'Volume and Storage Issues',
    content: `
      <h2>Volume and Storage Issues</h2>
      <ul>
        <li>Inspect volumes: <code>docker volume inspect my-volume</code></li>
        <li>List volumes: <code>docker volume ls</code></li>
        <li>Remove unused volumes: <code>docker volume prune</code></li>
        <li>Check mount points in containers: <code>docker inspect container_name</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command lists all volumes?',
        options: [
          'docker volume ls',
          'docker inspect volume',
          'docker ps -v',
          'docker logs volume',
        ],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'Inspect volume "exam-vol" and prune unused volumes.',
        expectedCommand: 'docker volume inspect exam-vol\ndocker volume prune',
      },
    ],
  },
  {
    id: 'trbl-06',
    title: 'Common Container Start Failures',
    content: `
      <h2>Common Container Start Failures</h2>
      <ul>
        <li>Check logs for errors: <code>docker logs container_name</code></li>
        <li>Inspect container config: <code>docker inspect container_name</code></li>
        <li>Resource constraints: verify CPU/memory limits</li>
        <li>Image compatibility: verify architecture and OS compatibility</li>
      </ul>
    `,
    quiz: [
      {
        question: 'What should you check if a container fails to start?',
        options: [
          'Container logs and image configuration',
          'Docker version only',
          'Host OS uptime',
          'Network IP only',
        ],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'A container "exam-app" fails to start. Check logs, inspect the container, and review resources.',
        expectedCommand: 'docker logs exam-app\ndocker inspect exam-app\ndocker stats exam-app',
      },
    ],
  },
  {
    id: 'trbl-07',
    title: 'Common Image Issues',
    content: `
      <h2>Common Image Issues</h2>
      <ul>
        <li>Image not found: verify image name and tag</li>
        <li>Old image version: pull the latest version using <code>docker pull image_name</code></li>
        <li>Dangling images: remove with <code>docker image prune</code></li>
        <li>Corrupted images: remove and re-pull</li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you remove dangling images?',
        options: [
          'docker rm image',
          'docker image prune',
          'docker rmi -f image',
          'docker system prune -a',
        ],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Remove all dangling images on your system.',
        expectedCommand: 'docker image prune',
      },
      {
        scenario: 'Pull the latest version of "nginx" image.',
        expectedCommand: 'docker pull nginx:latest',
      },
    ],
  },
  {
    id: 'trbl-08',
    title: 'Summary and Best Practices',
    content: `
      <h2>Summary and Troubleshooting Best Practices</h2>
      <ul>
        <li>Always check container logs first</li>
        <li>Inspect containers, images, volumes, and networks</li>
        <li>Verify resource usage and constraints</li>
        <li>Keep images updated and minimal</li>
        <li>Use monitoring and alerting tools when possible</li>
      </ul>
      <p>Following these best practices ensures smooth container operations and readiness for DCA exam scenarios.</p>
    `,
    quiz: [
      {
        question: 'Which is a recommended troubleshooting practice?',
        options: [
          'Check container logs and inspect resources',
          'Reinstall Docker every time an error occurs',
          'Ignore volumes',
          'Never update images',
        ],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'Perform a general troubleshooting check on container "exam-app".',
        expectedCommand: 'docker logs exam-app\ndocker inspect exam-app\ndocker volume ls\ndocker network ls\ndocker stats exam-app',
      },
    ],
  },
];

const compose: Lesson[] = [
  {
    id: 'comp-01',
    title: 'Introduction to Docker Compose',
    content: `
      <h2>Introduction to Docker Compose</h2>
      <p>Docker Compose is a tool to define and manage multi-container Docker applications using a YAML file.</p>
      <ul>
        <li>Define services, networks, and volumes in <code>docker-compose.yml</code>.</li>
        <li>Manage the lifecycle of all services with simple commands.</li>
      </ul>
    `,
    quiz: [
      {
        question: 'What is Docker Compose used for?',
        options: [
          'Running a single container',
          'Building images only',
          'Defining and managing multi-container applications',
          'Inspecting container logs',
        ],
        answer: 2,
      },
    ],
    exercises: [
      {
        scenario: 'Create a simple docker-compose.yml with one service running nginx.',
        expectedCommand: `version: "3.9"
services:
  web:
    image: nginx
    ports:
      - "8080:80"`,
      },
    ],
  },
  {
    id: 'comp-02',
    title: 'Basic Docker Compose Commands',
    content: `
      <h2>Basic Docker Compose Commands</h2>
      <ul>
        <li><code>docker-compose up</code> - Start all services</li>
        <li><code>docker-compose up -d</code> - Start services in detached mode</li>
        <li><code>docker-compose down</code> - Stop and remove containers, networks</li>
        <li><code>docker-compose ps</code> - List running services</li>
        <li><code>docker-compose logs</code> - View logs</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command starts all services in detached mode?',
        options: ['docker-compose start', 'docker-compose up -d', 'docker run -dit', 'docker-compose down'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Start all services defined in docker-compose.yml in detached mode.',
        expectedCommand: 'docker-compose up -d',
      },
    ],
  },
  {
    id: 'comp-03',
    title: 'Defining Services and Networks',
    content: `
      <h2>Services and Networks</h2>
      <p>In docker-compose.yml, you can define multiple services and attach them to networks:</p>
      <pre>
version: "3.9"
services:
  web:
    image: nginx
    networks:
      - mynet
    depends_on:
      - db
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks:
      - mynet

networks:
  mynet:
    driver: bridge
      </pre>
    `,
    quiz: [
      {
        question: 'Which key defines networks in Compose?',
        options: ['services', 'networks', 'volumes', 'depends_on'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Add a custom network to docker-compose.yml.',
        expectedCommand: 'networks:\n  mynet:\n    driver: bridge',
      },
    ],
  },
  {
    id: 'comp-04',
    title: 'Volumes in Compose',
    content: `
      <h2>Volumes in Compose</h2>
      <p>Define volumes for persistent data:</p>
      <pre>
version: "3.9"
services:
  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:
      </pre>
    `,
    quiz: [
      {
        question: 'How do you define a named volume in Compose?',
        options: ['volumes: - /data', 'volumes: db-data', 'Under volumes key at top level', 'In services'],
        answer: 2,
      },
    ],
    exercises: [
      {
        scenario: 'Add a volume "app-data" to a service in Compose.',
        expectedCommand: 'volumes:\n  app-data:',
      },
    ],
  },
  {
    id: 'comp-05',
    title: 'Scaling Services',
    content: `
      <h2>Scaling Services</h2>
      <p>Scale services using Compose:</p>
      <ul>
        <li><code>docker-compose up -d --scale web=3</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you scale a service to 3 replicas?',
        options: ['docker-compose scale web=3', 'docker-compose up -d --scale web=3', 'docker run --scale web=3', 'docker service scale web=3'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Scale the web service to 3 containers.',
        expectedCommand: 'docker-compose up -d --scale web=3',
      },
    ],
  },
  {
    id: 'comp-06',
    title: 'Stopping and Removing Services',
    content: `
      <h2>Stopping and Removing Services</h2>
      <p>Use <code>docker-compose down</code> to stop all services and remove containers, networks, and default volumes.</p>
    `,
    quiz: [
      {
        question: 'Which command stops all services and removes containers and networks?',
        options: ['docker stop', 'docker-compose down', 'docker-compose stop', 'docker rm'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Stop all services and remove containers and networks.',
        expectedCommand: 'docker-compose down',
      },
    ],
  },
  {
    id: 'comp-07',
    title: 'Advanced Compose Features',
    content: `
      <h2>Advanced Compose Features</h2>
      <ul>
        <li>Environment variables: <code>environment</code> or <code>env_file</code></li>
        <li>Healthchecks: ensure service readiness</li>
        <li>Command and entrypoint overrides: <code>command</code>, <code>entrypoint</code></li>
        <li>External networks: reuse existing Docker networks</li>
      </ul>
      <pre>
services:
  web:
    image: nginx
    command: ["nginx", "-g", "daemon off;"]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      retries: 3
    env_file:
      - .env
    networks:
      - external-net

networks:
  external-net:
    external: true
      </pre>
    `,
    quiz: [
      {
        question: 'Which key allows checking if a service is ready in Compose?',
        options: ['depends_on', 'healthcheck', 'volumes', 'networks'],
        answer: 1,
      },
      {
        question: 'How do you use an external network in Compose?',
        options: ['external: true under networks', 'driver: external', 'attach: external', 'use_external: yes'],
        answer: 0,
      },
    ],
    exercises: [
      {
        scenario: 'Add a healthcheck to a web service and attach it to an external network.',
        expectedCommand: `healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 30s
  retries: 3
networks:
  external-net:
    external: true`,
      },
    ],
  },
];

const courseModules: CourseModule[] = [
  {
    id: 'mod-01',
    title: 'Docker Fundamentals',
    lessons: fundamentals,
    description: 'Core concepts, architecture, installation, and basic commands.',
  },
  {
    id: 'mod-02',
    title: 'Docker Images',
    lessons: images,
    description: 'Working with images: building, pulling, tagging, and managing images.',
  },
  {
    id: 'mod-03',
    title: 'Docker Networking',
    lessons: networking,
    description: 'Network types, connections, port mapping, and troubleshooting.',
  },
  {
    id: 'mod-04',
    title: 'Docker Storage',
    lessons: storage,
    description: 'Volumes, bind mounts, tmpfs mounts, and persistent data management.',
  },
  {
    id: 'mod-05',
    title: 'Docker Security',
    lessons: security,
    description: 'Container security best practices, secrets, content trust, and vulnerability scanning.',
  },
  {
    id: 'mod-06',
    title: 'Docker Orchestration',
    lessons: orchestration,
    description: 'Swarm mode, services, stacks, and basic orchestration.',
  },
  {
    id: 'mod-07',
    title: 'Docker Compose',
    lessons: compose,
    description: 'Defining multi-container applications, Compose v2, and orchestration basics.',
  },
  {
    id: 'mod-08',
    title: 'Docker Troubleshooting',
    lessons: troubleshooting,
    description: 'Debugging containers, networks, volumes, and images with best practices.',
  },
];

interface ExerciseProps {
  scenario: string;
  expectedCommand: string;
}

const Exercise: React.FC<ExerciseProps> = ({ scenario, expectedCommand }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="my-4 p-4 border rounded bg-white shadow-md">
      <p className="mb-2 font-medium">{scenario}</p>
      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setSubmitted(true)}
        disabled={submitted}
      >
        {submitted ? 'Answer Shown' : 'Show Answer'}
      </button>
      {submitted && (
        <pre className="mt-2 bg-gray-200 p-2 rounded-md">{expectedCommand}</pre>
      )}
    </div>
  );
};

interface LessonProps {
  lesson: Lesson;
}

const LessonComponent: React.FC<LessonProps> = ({ lesson }) => {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (lesson.quiz) {
      setQuizAnswers(new Array(lesson.quiz.length).fill(-1));
    }
  }, [lesson.quiz]);

  const handleAnswer = (quizIndex: number, selectedOption: number) => {
    if (quizAnswers[quizIndex] !== -1) return;
    const updated = [...quizAnswers];
    updated[quizIndex] = selectedOption;
    setQuizAnswers(updated);
  };

  return (
    <div className="mb-8 w-full">
      <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>

      <div className="mb-6" dangerouslySetInnerHTML={{ __html: lesson.content }} />

      {lesson.quiz?.length ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Quiz</h2>
          {lesson.quiz.map((q: Quiz, idx: number) => (
            <div key={idx} className="mb-4 p-4 border rounded bg-white shadow-md">
              <p className="font-medium mb-2">{q.question}</p>
              {q.options.map((option: string, i: number) => {
                const isSelected = quizAnswers[idx] === i;
                const isCorrect = q.answer === i;
                return (
                  <button
                    key={i}
                    className={`block w-full text-left p-2 mb-1 rounded-md border ${
                      isSelected
                        ? isCorrect
                          ? 'bg-green-100 border-green-400'
                          : 'bg-red-100 border-red-400'
                        : 'bg-white border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleAnswer(idx, i)}
                    disabled={quizAnswers[idx] !== -1}
                  >
                    {option}
                  </button>
                );
              })}
              {quizAnswers[idx] !== -1 && (
                <p className="mt-2 font-semibold">
                  {quizAnswers[idx] === q.answer
                    ? 'Correct ✅'
                    : `Incorrect ❌. Correct answer: ${q.options[q.answer]}`}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {lesson.exercises?.length ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Exercises</h2>
          {lesson.exercises.map((ex: ExerciseItem, idx: number) => (
            <Exercise key={idx} scenario={ex.scenario} expectedCommand={ex.expectedCommand} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

interface CourseSidebarProps {
  onSelectLesson: (lesson: Lesson) => void;
  currentLessonId: string;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  onSelectLesson,
  currentLessonId,
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="p-4 bg-gray-200 overflow-y-auto border-r" style={{ width: '20rem', height: '100vh' }}>
      <h2 className="font-bold text-2xl mb-4">Docker Course - A.Mohammadpour</h2>
      {courseModules.map((module: CourseModule) => (
        <div key={module.id} className="mb-4">
          <button
            className="w-full text-left font-semibold p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => toggleModule(module.id)}
          >
            {module.title}
          </button>

          {expandedModules.includes(module.id) && (
            <ul className="mt-2 ml-4">
              {module.lessons.map((lesson: Lesson) => (
                <li key={lesson.id} className="mb-2">
                  <button
                    className={`w-full text-left p-2 rounded-md ${
                      currentLessonId === lesson.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => onSelectLesson(lesson)}
                  >
                    {lesson.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(courseModules[0]?.lessons[0] || null);

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br">
      <CourseSidebar 
        onSelectLesson={handleSelectLesson}
        currentLessonId={selectedLesson?.id || ''}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedLesson ? (
          <LessonComponent lesson={selectedLesson} />
        ) : (
          <div className="text-center text-gray-600">
            <h1 className="text-4xl font-bold mb-4">Welcome to Docker Course</h1>
            <p>Select a lesson from the sidebar to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;