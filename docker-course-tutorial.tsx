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
      Containers are lightweight, portable, and ensure consistency across environments. Unlike virtual machines, containers share the host kernel, making them more efficient in terms of resources.</p>
      <p>Key benefits of Docker include:</p>
      <ul>
        <li>Isolation of applications: Each container runs in its own environment without interfering with others.</li>
        <li>Portability across machines and cloud providers: Build once, run anywhere with the same behavior.</li>
        <li>Version control of images: Images can be tagged and versioned like code.</li>
        <li>Resource efficiency compared to VMs: Lower overhead as they don't require a full OS per container.</li>
      </ul>
      <p>For DCA exam preparation: Understand that Docker uses Linux namespaces, cgroups, and union filesystems for isolation. Be ready to explain the difference between containers and VMs.</p>
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
      <p>Docker architecture consists of several key components that work together to manage containers:</p>
      <ul>
        <li><strong>Docker Engine:</strong> The core component that builds, runs, and manages containers. It includes the daemon, CLI, and REST API.</li>
        <li><strong>Docker Daemon (dockerd):</strong> A background service that manages Docker objects like images, containers, networks, and volumes. It listens for API requests.</li>
        <li><strong>Docker Client (docker):</strong> The command-line tool (CLI) used to interact with the Docker daemon. Commands like docker run are sent to the daemon.</li>
        <li><strong>Docker Registry:</strong> A repository for storing and distributing Docker images (e.g., Docker Hub, private registries). Images are pushed to and pulled from registries.</li>
      </ul>
      <p>Additional details: Docker uses containerd as the runtime for managing container lifecycles and runc for low-level runtime operations. For DCA: Know how the client communicates with the daemon via Unix socket or TCP, and be familiar with securing the daemon.</p>
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
      <p>Docker Images are read-only templates that include the application code, runtime, libraries, and dependencies needed to run the application. They are built from Dockerfiles and stored in registries.</p>
      <p>Docker Containers are runnable instances of images. They add a writable layer on top of the image layers, allowing state changes during runtime.</p>
      <ul>
        <li>Images: Static, immutable, versioned, reusable. Think of them as blueprints.</li>
        <li>Containers: Dynamic, isolated processes that can be started, stopped, or deleted. Multiple containers can run from the same image.</li>
      </ul>
      <p>Example commands:</p>
      <pre>
docker pull nginx        # Download the nginx image from Docker Hub
docker run -d --name my-nginx nginx   # Start a detached container from the image
docker ps                # List running containers to verify
docker stop my-nginx     # Stop the container
docker rm my-nginx       # Remove the container
      </pre>
      <p>For DCA exam: Understand image layers (union filesystem like OverlayFS), how containers share the host kernel, and commands for managing images and containers. Know that images are immutable, but containers have a writable layer.</p>
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
      <p>Essential Docker commands form the foundation of working with Docker. Here's a detailed overview:</p>
      <ul>
        <li><strong>docker build</strong> - Builds an image from a Dockerfile. Use -t to tag the image, e.g., docker build -t myapp .</li>
        <li><strong>docker run</strong> - Runs a container from an image. Options: -d (detached), -it (interactive), --name (name the container), -p (port mapping).</li>
        <li><strong>docker ps</strong> - Lists running containers. Use -a to show all (including stopped).</li>
        <li><strong>docker stop</strong> - Gracefully stops a running container by sending SIGTERM.</li>
        <li><strong>docker rm</strong> - Removes a stopped container. Use -f to force remove running ones.</li>
        <li><strong>docker rmi</strong> - Removes an image. Use -f to force if containers depend on it.</li>
      </ul>
      <p>Other useful commands: docker logs (view container output), docker exec (run commands inside container), docker inspect (detailed info).</p>
      <p>For DCA: Be proficient with flags like --rm (auto-remove on exit), -v (volumes), -e (environment variables). Expect scenario-based questions on command usage.</p>
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
      <p>A Dockerfile is a script with instructions to build a Docker image. It defines the environment for your application.</p>
      <ul>
        <li><strong>FROM</strong>: Specifies the base image, e.g., FROM ubuntu:22.04. Always use official or trusted bases.</li>
        <li><strong>RUN</strong>: Executes commands during build, e.g., RUN apt-get update && apt-get install -y python. Use && to chain commands for layer optimization.</li>
        <li><strong>COPY / ADD</strong>: Copies files from host to image. COPY is preferred; ADD can handle URLs/tar extraction.</li>
        <li><strong>WORKDIR</strong>: Sets the working directory for subsequent instructions, e.g., WORKDIR /app.</li>
        <li><strong>CMD / ENTRYPOINT</strong>: Defines the default command. CMD can be overridden; ENTRYPOINT is for executables.</li>
        <li><strong>EXPOSE</strong>: Documents ports the container listens on, e.g., EXPOSE 80. Doesn't publish ports; use -p for that.</li>
      </ul>
      <p>Example Dockerfile for a simple web server:</p>
      <pre>
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y nginx
COPY index.html /var/www/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
      </pre>
      <p>Best practices: Use multi-stage builds for smaller images, minimize layers, use .dockerignore to exclude files. For DCA: Know instruction order affects caching, and be able to write/debug Dockerfiles.</p>
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
      <p>Managing containers involves starting, stopping, and interacting with them:</p>
      <ul>
        <li><strong>docker start/stop/restart</strong>: Controls container state. start for stopped containers, restart = stop + start.</li>
        <li><strong>docker exec -it container /bin/bash</strong>: Runs a command inside a running container, e.g., open a shell.</li>
        <li><strong>docker logs container</strong>: Views stdout/stderr. Use -f to follow in real-time, --tail N for last N lines.</li>
        <li><strong>docker inspect container</strong>: Provides detailed JSON info, e.g., IP, mounts. Use -f for formatted output.</li>
        <li><strong>docker rm container</strong>: Removes a container. Use -v to remove volumes, -f for running ones.</li>
      </ul>
      <p>Advanced: Use docker cp to copy files between host and container. For DCA: Know how to troubleshoot with exec/logs/inspect, and flags like --restart policies (no, always, on-failure).</p>
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
      <p>Docker images are read-only templates used to create containers. They package an application and its dependencies into a standardized unit.</p>
      <p>Key points:</p>
      <ul>
        <li>Images consist of layers stacked on top of each other, using union filesystems like OverlayFS for efficiency.</li>
        <li>Each layer represents a filesystem change (e.g., adding files, installing packages). Shared layers reduce storage.</li>
        <li>Images are immutable once created, ensuring consistency. Changes during runtime happen in the container's writable layer.</li>
        <li>Images are stored in registries such as Docker Hub, ECR, or private ones. Use docker search to find images.</li>
      </ul>
      <p>For DCA: Understand image IDs (SHA256 digests), tags (e.g., latest, v1.0), and multi-arch images for different platforms (amd64, arm64).</p>
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
      <p>A Dockerfile is a text file with instructions to build a Docker image. It automates the creation of reproducible images.</p>
      <p>Common instructions:</p>
      <ul>
        <li><code>FROM</code> - Base image, e.g., FROM alpine:3.18. Choose minimal bases for security and size.</li>
        <li><code>RUN</code> - Execute commands during build, e.g., RUN apk add --no-cache curl. Optimize by combining commands.</li>
        <li><code>COPY</code> - Copy files from host into image, e.g., COPY app.py /app/. Use .dockerignore to exclude unnecessary files.</li>
        <li><code>WORKDIR</code> - Set working directory, e.g., WORKDIR /app. Affects RUN, CMD, ENTRYPOINT.</li>
        <li><code>CMD</code> - Default command to run, e.g., CMD ["python", "app.py"]. Can be overridden at runtime.</li>
        <li><code>EXPOSE</code> - Port the container listens on, e.g., EXPOSE 5000. Informational; use -p to publish.</li>
      </ul>
      <p>Example:</p>
      <pre>
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY . /app
CMD ["bash"]
      </pre>
      <p>Best practices: Use ARG for build-time variables, LABEL for metadata. For DCA: Know instruction order affects caching, and be able to write/debug Dockerfiles.</p>
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
      <p>Build images using the <code>docker build</code> command, which reads the Dockerfile and creates layered images.</p>
      <ul>
        <li>Command: <code>docker build -t myimage:latest .</code> - Builds from current directory, tags as myimage:latest.</li>
        <li>Options: --no-cache (ignore cache), --pull (pull latest base image), -f (specify Dockerfile path).</li>
        <li>Build context: The directory sent to the daemon; use .dockerignore to exclude files like node_modules.</li>
      </ul>
      <p>DCA tip: Understand build cache mechanics—changes in instructions invalidate subsequent layers. Order instructions from least to most changing (e.g., COPY last).</p>
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
        <li>Tag: <code>docker tag myimage:latest myrepo/myimage:v1</code> - Creates an alias for pushing.</li>
        <li>Push: <code>docker push myrepo/myimage:v1</code> - Uploads to Docker Hub or private registry. Login with docker login first.</li>
        <li>Pull: <code>docker pull myrepo/myimage:v1</code> - Downloads from registry.</li>
      </ul>
      <p>DCA: Know about manifest lists for multi-arch images, and use --all-tags for pushing multiple tags. Understand authentication and private registries.</p>
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
      <p>Multi-stage builds allow using multiple FROM statements to separate build and runtime environments, reducing final image size.</p>
      <pre>
FROM golang:alpine AS builder
ADD . /src
RUN cd /src && go build -o /app
FROM alpine
COPY --from=builder /app /app
ENTRYPOINT ["/app"]
      </pre>
      <p>Benefits: Discard build tools/artifacts, use different bases. --target to build specific stages.</p>
      <p>DCA: Common for compiled languages like Go/Java. Know COPY --from syntax and how it optimizes CI/CD pipelines.</p>
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
        <li>Remove unused: <code>docker image prune -f</code> - Dangling images.</li>
        <li>All unused: <code>docker system prune -a --volumes</code></li>
        <li>Specific: <code>docker rmi -f image_id</code></li>
      </ul>
      <p>DCA: Understand dangling vs orphaned images, and use prune in production to manage disk space.</p>
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
      <p>Inspect image metadata and history to understand its layers and configuration.</p>
      <ul>
        <li><code>docker inspect image_name</code> - Shows detailed JSON: layers, env vars, cmd, etc. Use -f '{{.Config.Env}}' for specific fields.</li>
        <li><code>docker history image_name</code> - Displays layer history with sizes and instructions.</li>
      </ul>
      <p>DCA: Use inspect for troubleshooting, e.g., checking exposed ports or labels. Use history to reveal build steps.</p>
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
      <p>Docker caches layers during builds to speed up subsequent builds. If an instruction hasn't changed, it reuses the cache.</p>
      <ul>
        <li>Use <code>--no-cache</code> to rebuild from scratch, ignoring cache.</li>
        <li>Use <code>--cache-from</code> to leverage cache from other images, useful in CI/CD.</li>
      </ul>
      <p>Optimization: Place changing instructions (e.g., COPY code) last. DCA: Explain cache invalidation and how to force rebuilds.</p>
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
      <p>Docker provides isolated networks for containers to communicate with each other and the host, using drivers like bridge, host, overlay.</p>
      <p>Key concepts:</p>
      <ul>
        <li>Containers communicate using IP addresses and ports. Docker assigns IPs from network subnets.</li>
        <li>Docker networks provide isolation and service discovery via DNS (container names resolve to IPs).</li>
        <li>Network types: <strong>bridge</strong> (default, single-host), <strong>host</strong> (shares host network), <strong>overlay</strong> (multi-host Swarm), <strong>macvlan</strong> (direct network access).</li>
      </ul>
      <p>DCA: Know network scopes (local/global), drivers, and how to choose based on use case (e.g., overlay for clusters).</p>
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
      <p>Bridge is the default network for containers on a single host, providing isolation via NAT.</p>
      <ul>
        <li>Each container gets an IP on the bridge network (e.g., 172.17.0.x).</li>
        <li>Containers can communicate via IP or container name (DNS resolution).</li>
        <li>Create custom: <code>docker network create my-bridge</code>. Attach with --network.</li>
      </ul>
      <pre>
docker network create my-bridge
docker run -dit --name web --network my-bridge nginx
docker run -dit --name db --network my-bridge mysql
docker exec -it web ping db  # Test communication
      </pre>
      <p>DCA: Custom bridges allow better isolation. Know --ip for static IPs, subnet config.</p>
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
      <p>Host network uses the host's networking stack directly, with no isolation.</p>
      <ul>
        <li>No network isolation; container shares host IP and ports.</li>
        <li>Use for performance-sensitive apps where isolation isn't needed.</li>
        <li>Command: <code>docker run --network host ...</code>. Ports are bound to host directly.</li>
      </ul>
      <pre>
docker run -dit --name web --network host nginx
      </pre>
      <p>DCA: Host network avoids NAT overhead but risks port conflicts. Not recommended for multi-container apps.</p>
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
      <p>Overlay networks enable communication across multiple hosts in Swarm mode, using VXLAN for encapsulation.</p>
      <ul>
        <li>Create: <code>docker network create -d overlay my-overlay</code>. Available to services in Swarm.</li>
        <li>Containers on different hosts communicate via service names.</li>
        <li>Encrypted: --opt encrypted for IPsec.</li>
      </ul>
      <p>DCA: Overlay is global scope. Know ingress network for load balancing, troubleshooting vxlan.</p>
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
      <p>Macvlan allows containers to appear as physical devices on the host network with own MAC/IP.</p>
      <ul>
        <li>Create: <code>docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth0 my-macvlan</code></li>
        <li>Containers get IPs from physical network, no NAT.</li>
      </ul>
      <p>DCA: Use for legacy apps. Host can't communicate with macvlan containers; use ip link for subinterfaces.</p>
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
      <p>Map container ports to host ports for external access:</p>
      <pre>
docker run -dit -p 8080:80 nginx  # Maps host 8080 to container 80
docker run -dit -P nginx  # Auto-maps random host ports
      </pre>
      <p>Link containers (legacy): <code>--link web:web</code>. Adds env vars/hosts. Use networks instead.</p>
      <p>DCA: -p vs --publish-all, Swarm publishes on all nodes. Linking legacy.</p>
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
        <li>Inspect: <code>docker network inspect my-network</code> - Subnet, gateway, containers.</li>
        <li>IP: <code>docker inspect -f '{{ .NetworkSettings.IPAddress }}' name</code></li>
        <li>Ping: <code>docker exec -it name ping other</code></li>
        <li>Prune: <code>docker network prune</code></li>
      </ul>
      <p>DCA: Diagnose DNS, ICC, published ports.</p>
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
      <p>Docker allows configuring DNS and aliases for service discovery:</p>
      <ul>
        <li>DNS: <code>--dns 8.8.8.8</code></li>
        <li>Aliases: <code>--network-alias frontend</code></li>
      </ul>
      <pre>
docker network create my-net
docker run -dit --name web --network my-net --network-alias frontend nginx
docker run -dit --name app --network my-net ping frontend
      </pre>
      <p>DCA: Built-in DNS (127.0.0.11), aliases for load balancing.</p>
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
      <p>Docker containers share the host OS kernel, so a compromise in one container could affect the host if not secured properly.</p>
      <ul>
        <li>Run containers with least privilege: Avoid root, use --security-opt no-new-privileges.</li>
        <li>Use trusted images from official registries: Verify with Content Trust.</li>
        <li>Regularly scan images for vulnerabilities: Use tools like Docker Scout or Trivy.</li>
      </ul>
      <p>DCA: Focus on kernel namespaces/cgroups for isolation, AppArmor/SELinux for mandatory access control, and seccomp for syscall filtering.</p>
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
      <p>Best practice: Avoid running processes as root inside containers to minimize escalation risks.</p>
      <ul>
        <li>Specify user in Dockerfile: <code>USER appuser</code> after creating a non-root user with RUN useradd.</li>
        <li>Override at runtime: <code>docker run -u 1001:1001 myimage</code> (UID:GID).</li>
      </ul>
      <p>DCA: Know --user flag, and how rootless mode (daemon runs as non-root) enhances security in newer Docker versions.</p>
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
      <p>Docker secrets securely store sensitive data like passwords, mounted as files in /run/secrets/.</p>
      <ul>
        <li>Create: <code>echo "mypassword" | docker secret create db_password -</code> or from file.</li>
        <li>Use: <code>docker service create --name db --secret db_password mysql</code>. Access via /run/secrets/db_password.</li>
      </ul>
      <p>DCA: Secrets encrypted in Raft logs, only to granted services. Compare with env vars.</p>
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
      <p>Docker Content Trust (DCT) uses digital signatures to verify image integrity and publisher.</p>
      <ul>
        <li>Enable: <code>export DOCKER_CONTENT_TRUST=1</code> - Pulls only signed images.</li>
        <li>Sign/push: docker push with trust enabled. Uses Notary.</li>
      </ul>
      <p>DCA: Know DCT workflow, root keys, prevents MITM. Enterprise like DTR enhance.</p>
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
      <p>Scan for CVEs to mitigate risks.</p>
      <ul>
        <li>Tools: Trivy, Clair, Snyk.</li>
        <li>Trivy: <code>trivy image --exit-code 1 --severity HIGH,CRITICAL myimage</code></li>
      </ul>
      <p>DCA: Vulnerability levels, minimal bases, docker scan.</p>
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
        <li>Minimal bases: alpine/scratch.</li>
        <li>Non-root: USER in Dockerfile.</li>
        <li>Update images.</li>
        <li>Cap drop: <code>--cap-drop=ALL</code>.</li>
        <li>Read-only: <code>--read-only</code>.</li>
      </ul>
      <p>DCA: CIS Benchmark, runtime security (Falco).</p>
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
  {
    id: 'sec-07',
    title: 'Advanced Security Features',
    content: `
      <h2>Advanced Security Features</h2>
      <p>Enhance security with kernel features:</p>
      <ul>
        <li>AppArmor/SELinux: <code>--security-opt apparmor=profile</code></li>
        <li>Seccomp: <code>--security-opt seccomp=/path/profile.json</code> - Filter syscalls.</li>
        <li>Docker Bench: Audit tool for CIS compliance.</li>
      </ul>
      <p>DCA: Know profiles, custom seccomp, bench checks.</p>
    `,
    quiz: [
      {
        question: 'What does seccomp filter?',
        options: ['Network calls', 'Syscalls', 'File access', 'Env vars'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run a container with AppArmor profile.',
        expectedCommand: 'docker run -dit --security-opt apparmor=docker-default ubuntu',
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
      <p>Containers are ephemeral by default—data is lost when stopped. Persistent storage is crucial for stateful apps.</p>
      <p>To persist data, Docker provides:</p>
      <ul>
        <li><strong>Volumes</strong>: Managed by Docker, stored in /var/lib/docker/volumes/. Best for persistence.</li>
        <li><strong>Bind mounts</strong>: Map host directories/files into containers for direct access.</li>
        <li><strong>Tmpfs mounts</strong>: In-memory storage for sensitive/temp data, cleared on stop.</li>
      </ul>
      <p>Drivers: local (default), plugins for cloud/NFS. DCA: Know storage drivers (overlay2, aufs), and when to use volumes vs binds.</p>
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
      <p>Volumes are preferred for persistent storage, decoupled from container lifecycle.</p>
      <ul>
        <li>Create: <code>docker volume create my-volume</code></li>
        <li>Mount: <code>docker run -dit -v my-volume:/data ubuntu</code></li>
        <li>Shared: Multiple containers can mount.</li>
        <li>Anonymous: <code>-v /data</code></li>
        <li>Read-only: <code>-v my-volume:/data:ro</code></li>
      </ul>
      <p>DCA: Volumes use host storage but managed; backup with docker cp/plugins.</p>
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
      <p>Bind mounts link host path to container path.</p>
      <ul>
        <li><code>docker run -dit -v /host/path:/container/path ubuntu</code></li>
        <li>Changes reflect both ways.</li>
      </ul>
      <pre>
docker run -dit -v $(pwd)/app:/app dev-image
      </pre>
      <p>DCA: Binds not portable; security risk for sensitive dirs.</p>
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
      <p>Tmpfs mounts store data in RAM.</p>
      <ul>
        <li><code>docker run -dit --tmpfs /run:size=64m ubuntu</code></li>
        <li>Cleared on stop/reboot.</li>
      </ul>
      <p>DCA: Linux-specific; for temp/sensitive data.</p>
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
        <li>Inspect: <code>docker volume inspect my-volume</code></li>
        <li>Remove: <code>docker volume rm my-volume</code></li>
        <li>Prune: <code>docker volume prune</code></li>
      </ul>
      <p>DCA: Use for troubleshooting mounts; filters like --filter.</p>
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
      <p>Orchestration manages multiple containers across hosts: deployment, scaling, networking, availability.</p>
      <ul>
        <li>Automates load balancing, discovery, updates.</li>
        <li>Swarm: Built-in clustering.</li>
        <li>Compose: Local multi-container.</li>
      </ul>
      <p>DCA: Swarm vs Kubernetes; manager-worker.</p>
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
        <li>Init: <code>docker swarm init --advertise-addr IP</code></li>
        <li>Join: <code>docker swarm join --token TOKEN HOST:2377</code></li>
        <li>Roles: Managers (Raft), workers.</li>
        <li>List: <code>docker node ls</code></li>
        <li>TLS: Auto-certs.</li>
      </ul>
      <p>DCA: Quorum odd managers; drain nodes.</p>
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
      <p>Services define desired state for tasks.</p>
      <ul>
        <li>Create: <code>docker service create --name web --replicas 3 -p 80:80 nginx</code></li>
        <li>Scale: <code>docker service scale web=5</code></li>
        <li>Inspect: <code>docker service inspect web</code></li>
        <li>Constraints: <code>--constraint node.role==manager</code></li>
        <li>Health/restart: --health-cmd, --restart-condition.</li>
      </ul>
      <p>DCA: Replicated/global; update --image.</p>
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
      <p>Stacks deploy from Compose in Swarm.</p>
      <ul>
        <li>Deploy: <code>docker stack deploy -c docker-compose.yml mystack</code></li>
        <li>List: <code>docker stack ls</code></li>
        <li>Remove: <code>docker stack rm mystack</code></li>
      </ul>
      <p>DCA: Stack vs compose; placement in YAML.</p>
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
        <li>Update: <code>docker service update --image newimage web</code></li>
        <li>Control: <code>--update-parallelism 2 --update-delay 10s</code></li>
        <li>Rollback: <code>docker service rollback web</code></li>
      </ul>
      <p>DCA: --rollback-monitor; health for zero-downtime.</p>
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
        <li>Define in YAML: services, networks, volumes.</li>
        <li>Up: <code>docker compose up -d --build</code></li>
        <li>Down: <code>docker compose down -v</code></li>
        <li>Logs: <code>docker compose logs -f</code></li>
        <li>Ps: <code>docker compose ps -a</code></li>
      </ul>
      <p>DCA: v2 go-based; profiles, extends.</p>
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
        <li>Secret: <code>echo "pass" | docker secret create db_pass -</code></li>
        <li>Use: <code>--secret db_pass</code></li>
        <li>Config: <code>docker config create app_config config.yml</code></li>
        <li>Use: <code>--config app_config</code></li>
        <li>Encrypted in Swarm.</li>
      </ul>
      <p>DCA: Configs non-sensitive, secrets sensitive; rotate.</p>
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
        <li>Check container IP: <code>docker inspect -f '{{ .NetworkSettings.IPAddress }}' container_name</code></li>
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
        <li>Image not found: verify name and tag</li>
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
        <li><code>docker compose up</code> - Start all services</li>
        <li><code>docker compose up -d</code> - Start services in detached mode</li>
        <li><code>docker compose down</code> - Stop and remove containers, networks</li>
        <li><code>docker compose ps</code> - List running services</li>
        <li><code>docker compose logs</code> - View logs</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Which command starts all services in detached mode?',
        options: ['docker compose start', 'docker compose up -d', 'docker run -dit', 'docker compose down'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Start all services defined in docker-compose.yml in detached mode.',
        expectedCommand: 'docker compose up -d',
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
      <p>Use Compose to scale services:</p>
      <ul>
        <li><code>docker compose up -d --scale web=3</code></li>
      </ul>
    `,
    quiz: [
      {
        question: 'How do you scale a service to 3 replicas?',
        options: ['docker compose scale web=3', 'docker compose up -d --scale web=3', 'docker run --scale web=3', 'docker service scale web=3'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Scale the web service to 3 containers.',
        expectedCommand: 'docker compose up -d --scale web=3',
      },
    ],
  },
  {
    id: 'comp-06',
    title: 'Stopping and Removing Services',
    content: `
      <h2>Stopping and Removing Services</h2>
      <p>Use <code>docker compose down</code> to stop all services and remove containers, networks, and default volumes.</p>
    `,
    quiz: [
      {
        question: 'Which command stops all services and removes containers and networks?',
        options: ['docker stop', 'docker compose down', 'docker compose stop', 'docker rm'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Stop all services and remove containers and networks.',
        expectedCommand: 'docker compose down',
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

const installation: Lesson[] = [
  {
    id: 'inst-01',
    title: 'Installing Docker on Linux',
    content: `
      <h2>Installing Docker on Linux</h2>
      <p>Docker CE installation on Ubuntu/CentOS involves adding repositories and installing packages.</p>
      <ul>
        <li>Ubuntu: Add Docker repo, apt install docker-ce.</li>
        <li>CentOS: Yum repo, yum install docker-ce.</li>
        <li>Verify: docker --version, docker run hello-world.</li>
      </ul>
      <p>DCA: Know post-install steps like usermod -aG docker user, systemctl enable docker.</p>
    `,
    quiz: [
      {
        question: 'Which command installs Docker CE on Ubuntu?',
        options: ['apt-get install docker', 'apt-get install docker-ce', 'yum install docker', 'curl docker-install'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Install Docker CE on Ubuntu.',
        expectedCommand: 'sudo apt-get update && sudo apt-get install -y docker-ce',
      },
    ],
  },
  {
    id: 'inst-02',
    title: 'Configuring Docker Daemon',
    content: `
      <h2>Configuring Docker Daemon</h2>
      <p>Edit /etc/docker/daemon.json for custom settings.</p>
      <ul>
        <li>Log driver: "log-driver": "syslog"</li>
        <li>Storage: "storage-driver": "overlay2"</li>
        <li>Insecure registry: "insecure-registries": ["myreg:5000"]</li>
      </ul>
      <p>DCA: Restart daemon after changes: systemctl restart docker.</p>
    `,
    quiz: [
      {
        question: 'What file configures Docker daemon settings?',
        options: ['/etc/docker/config.json', '/etc/docker/daemon.json', '/var/lib/docker/daemon.json', '/usr/bin/docker/daemon.json'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Configure daemon to use syslog logging.',
        expectedCommand: 'sudo vi /etc/docker/daemon.json  # add {"log-driver": "syslog"}\nsudo systemctl restart docker',
      },
    ],
  },
  {
    id: 'inst-03',
    title: 'Docker in Cloud Environments',
    content: `
      <h2>Docker in Cloud Environments</h2>
      <p>Cloud providers offer pre-installed Docker or easy setup.</p>
      <ul>
        <li>AWS EC2: Use user-data script to install Docker.</li>
        <li>GCP Compute: Enable Container-Optimized OS.</li>
        <li>Azure VM: Install via apt/yum.</li>
      </ul>
      <p>DCA: Know cloud-specific integrations like ECS, GKE, AKS for Docker.</p>
    `,
    quiz: [
      {
        question: 'Which cloud service supports Docker via user-data scripts?',
        options: ['GCP Compute', 'Azure VM', 'AWS EC2', 'AWS Lambda'],
        answer: 2,
      },
    ],
    exercises: [
      {
        scenario: 'Write a user-data script to install Docker on EC2.',
        expectedCommand: '#!/bin/bash\napt-get update\napt-get install -y docker-ce',
      },
    ],
  },
];

const enterprise: Lesson[] = [
  {
    id: 'ent-01',
    title: 'Docker EE Overview',
    content: `
      <h2>Docker EE Overview</h2>
      <p>Docker Enterprise Edition (EE) extends CE with enterprise features for production.</p>
      <ul>
        <li>CE vs EE: EE adds UCP, DTR, support, RBAC.</li>
        <li>Licensing: Subscription-based.</li>
        <li>Use cases: Large-scale, secure deployments.</li>
      </ul>
      <p>DCA: Know EE components for orchestration/security.</p>
    `,
    quiz: [
      {
        question: 'What is a key feature of Docker EE?',
        options: ['Free for all', 'UCP for cluster management', 'Only for Windows', 'No Swarm support'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Research Docker EE licensing.',
        expectedCommand: 'Visit docker.com/pricing',
      },
    ],
  },
  {
    id: 'ent-02',
    title: 'Universal Control Plane (UCP)',
    content: `
      <h2>Universal Control Plane (UCP)</h2>
      <p>UCP provides web-based management for Swarm clusters.</p>
      <ul>
        <li>Install: <code>docker container run --rm -it --name ucp -v /var/run/docker.sock:/var/run/docker.sock mirantis/ucp:3.4.0 install --host-address &lt;ip&gt; --interactive</code></li>
        <li>Manage: Users, teams, RBAC roles.</li>
        <li>Features: GUI for services, nodes, monitoring.</li>
      </ul>
      <p>DCA: UCP integrates with LDAP, handles HA with multiple managers.</p>
    `,
    quiz: [
      {
        question: 'What does UCP provide?',
        options: ['Private registry', 'Web-based cluster management', 'Image building', 'Volume backup'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Install UCP on a node.',
        expectedCommand: 'docker ucp install',
      },
    ],
  },
  {
    id: 'ent-03',
    title: 'Docker Trusted Registry (DTR)',
    content: `
      <h2>Docker Trusted Registry (DTR)</h2>
      <p>DTR is a secure private registry for images.</p>
      <ul>
        <li>Install: <code>docker container run -it --rm mirantis/dtr install --ucp-url &lt;ucp-url&gt;</code></li>
        <li>Features: Push/pull, scanning, signing.</li>
        <li>Integrates with UCP for auth.</li>
      </ul>
      <p>DCA: DTR for on-prem registries, vulnerability scans.</p>
    `,
    quiz: [
      {
        question: 'What does DTR provide?',
        options: ['Cluster management', 'Private registry with scanning', 'Container runtime', 'Network driver'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Install DTR.',
        expectedCommand: 'docker dtr install',
      },
    ],
  },
];

const advancedSwarm: Lesson[] = [
  {
    id: 'advsw-01',
    title: 'Node Labels and Constraints',
    content: `
      <h2>Node Labels and Constraints</h2>
      <p>Labels classify nodes; constraints place services.</p>
      <ul>
        <li>Label: <code>docker node update --label-add env=prod node1</code></li>
        <li>Constraint: <code>--constraint node.labels.env==prod</code></li>
      </ul>
      <p>DCA: Labels for scheduling; engine.labels too.</p>
    `,
    quiz: [
      {
        question: 'Which flag sets a node constraint?',
        options: ['--label', '--constraint', '--placement', '--role'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Add label env=prod to a node.',
        expectedCommand: 'docker node update --label-add env=prod node1',
      },
    ],
  },
  {
    id: 'advsw-02',
    title: 'Service Health Checks',
    content: `
      <h2>Service Health Checks</h2>
      <p>Health checks verify service readiness.</p>
      <ul>
        <li><code>--health-cmd "curl -f localhost" --health-interval 30s</code></li>
        <li>Retries, timeout for failure detection.</li>
      </ul>
      <p>DCA: Integrates with updates for zero-downtime.</p>
    `,
    quiz: [
      {
        question: 'What does --health-cmd do?',
        options: ['Sets command', 'Specifies health check command', 'Defines replicas', 'Adds constraint'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create service with health check.',
        expectedCommand: 'docker service create --health-cmd "curl -f http://localhost" nginx',
      },
    ],
  },
  {
    id: 'advsw-03',
    title: 'Advanced Stack Features',
    content: `
      <h2>Advanced Stack Features</h2>
      <p>Stack YAML with deploy options.</p>
      <pre>
services:
  web:
    deploy:
      replicas: 3
      placement:
        constraints: [node.labels.env == prod]
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
      </pre>
      <p>DCA: restart_policy, update_config.</p>
    `,
    quiz: [
      {
        question: 'Which YAML key sets replicas?',
        options: ['services.replicas', 'deploy.replicas', 'replicas', 'scale'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Write stack YAML with resource limits.',
        expectedCommand: 'See example above',
      },
    ],
  },
];

const monitoringLogging: Lesson[] = [
  {
    id: 'monlog-01',
    title: 'Docker Logging Drivers',
    content: `
      <h2>Docker Logging Drivers</h2>
      <p>Configure how container logs are handled.</p>
      <ul>
        <li>json-file (default), syslog, fluentd.</li>
        <li><code>--log-driver syslog --log-opt syslog-address=udp://...</code></li>
      </ul>
      <p>DCA: Rotation with max-size, max-file.</p>
    `,
    quiz: [
      {
        question: 'Which log driver sends to remote server?',
        options: ['json-file', 'syslog', 'local', 'none'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run container with syslog driver.',
        expectedCommand: 'docker run --log-driver syslog --log-opt syslog-address=udp://logserver:514 nginx',
      },
    ],
  },
  {
    id: 'monlog-02',
    title: 'Monitoring with Docker Tools',
    content: `
      <h2>Monitoring with Docker Tools</h2>
      <ul>
        <li><code>docker stats --format "{{.Name}}: {{.CPUPerc}}"</code></li>
        <li><code>docker events --filter 'type=container'</code></li>
        <li><code>docker system df -v</code> - Disk usage.</li>
      </ul>
      <p>DCA: Real-time monitoring.</p>
    `,
    quiz: [
      {
        question: 'Which command shows container metrics?',
        options: ['docker ps', 'docker stats', 'docker inspect', 'docker logs'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Monitor container CPU usage.',
        expectedCommand: 'docker stats --format "{{.Name}}: {{.CPUPerc}}"',
      },
    ],
  },
  {
    id: 'monlog-03',
    title: 'External Monitoring Tools',
    content: `
      <h2>External Monitoring Tools</h2>
      <ul>
        <li>cAdvisor: Container metrics.</li>
        <li>Prometheus/Grafana: Scraping docker metrics.</li>
      </ul>
      <p>DCA: Integrate cAdvisor, Prometheus.</p>
    `,
    quiz: [
      {
        question: 'What does cAdvisor monitor?',
        options: ['Logs', 'Container metrics', 'Networks', 'Volumes'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run cAdvisor container.',
        expectedCommand: 'docker run -d -p 8080:8080 prom/cadvisor',
      },
    ],
  },
];

const backupRecovery: Lesson[] = [
  {
    id: 'back-01',
    title: 'Backing Up Docker Data',
    content: `
      <h2>Backing Up Docker Data</h2>
      <ul>
        <li>Volumes: Use tar via busybox container.</li>
        <li>Images: <code>docker save -o image.tar image</code></li>
      </ul>
      <p>DCA: docker load to import.</p>
    `,
    quiz: [
      {
        question: 'Which command exports an image?',
        options: ['docker export', 'docker save', 'docker commit', 'docker push'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Backup a volume to tar.',
        expectedCommand: 'docker run --rm -v my-volume:/data busybox tar cvf /backup.tar /data',
      },
    ],
  },
  {
    id: 'back-02',
    title: 'Swarm Cluster Recovery',
    content: `
      <h2>Swarm Cluster Recovery</h2>
      <ul>
        <li>Backup /var/lib/docker/swarm on manager.</li>
        <li>Restore: Stop swarm, replace dir, swarm init --force-new-cluster.</li>
      </ul>
      <p>DCA: Raft logs for state.</p>
    `,
    quiz: [
      {
        question: 'Where are Swarm configs stored?',
        options: ['/etc/docker/swarm', '/var/lib/docker/swarm', '/root/swarm', '/usr/bin/swarm'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Backup Swarm state.',
        expectedCommand: 'tar cvf swarm-backup.tar /var/lib/docker/swarm',
      },
    ],
  },
];

const performance: Lesson[] = [
  {
    id: 'perf-01',
    title: 'Resource Constraints',
    content: `
      <h2>Resource Constraints</h2>
      <ul>
        <li>CPU: <code>--cpus="0.5"</code>, --cpu-shares.</li>
        <li>Memory: <code>--memory="512m"</code>, --memory-swap.</li>
      </ul>
      <p>DCA: OOM killer on memory exceed.</p>
    `,
    quiz: [
      {
        question: 'Which flag limits container memory?',
        options: ['--cpu', '--memory', '--storage', '--network'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Run container with CPU and memory limits.',
        expectedCommand: 'docker run -d --cpus="1" --memory="256m" nginx',
      },
    ],
  },
  {
    id: 'perf-02',
    title: 'Optimizing Dockerfiles',
    content: `
      <h2>Optimizing Dockerfiles</h2>
      <ul>
        <li>Minimal bases: alpine.</li>
        <li>Multi-stage: Discard tools.</li>
        <li>Layer optimization: Chain RUN.</li>
      </ul>
      <p>DCA: Reduce size for faster pulls.</p>
    `,
    quiz: [
      {
        question: 'Why use multi-stage builds?',
        options: ['Increase size', 'Reduce image size', 'Slow builds', 'No caching'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Write multi-stage Dockerfile for Node app.',
        expectedCommand: 'FROM node AS builder\n... \nFROM alpine\nCOPY --from=builder /app /app',
      },
    ],
  },
];

const practiceExams: Lesson[] = [
  {
    id: 'prac-01',
    title: 'Practice Exam 1',
    content: `
      <h2>Practice Exam 1</h2>
      <p>Simulate DCA with 55 questions. Time yourself 90 min.</p>
      <p>Example task: Create Swarm service with 3 replicas, custom network.</p>
      <p>Multiple choice: What is default network? (Bridge)</p>
    `,
    quiz: [
      {
        question: 'What is default Docker network?',
        options: ['Host', 'Bridge', 'Overlay', 'Macvlan'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Deploy service with constraints.',
        expectedCommand: 'docker service create --name web --constraint node.role==worker nginx',
      },
    ],
  },
  {
    id: 'prac-02',
    title: 'Practice Exam 2',
    content: `
      <h2>Practice Exam 2</h2>
      <p>Another set of 55 questions.</p>
      <p>Example: Troubleshoot failed container start.</p>
      <p>Multiple choice: Tool for scanning? (Trivy)</p>
    `,
    quiz: [
      {
        question: 'Tool for image scanning?',
        options: ['docker inspect', 'Trivy', 'docker ps', 'docker build'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Scan image for vulnerabilities.',
        expectedCommand: 'trivy image nginx',
      },
    ],
  },
  {
    id: 'prac-03',
    title: 'Complex Scenarios',
    content: `
      <h2>Complex Scenarios</h2>
      <p>Multi-step tasks.</p>
      <p>Example: Deploy stack, add secret, troubleshoot network.</p>
    `,
    quiz: [
      {
        question: 'Flag for secret in service?',
        options: ['--env', '--secret', '--volume', '--config'],
        answer: 1,
      },
    ],
    exercises: [
      {
        scenario: 'Create stack with secret.',
        expectedCommand: 'docker stack deploy -c compose.yml stack\n# with secrets in YAML',
      },
    ],
  },
];

const courseModules: CourseModule[] = [
  {
    id: 'mod-01',
    title: 'Docker Fundamentals',
    lessons: fundamentals,
  },
  {
    id: 'mod-02',
    title: 'Docker Images',
    lessons: images,
  },
  {
    id: 'mod-03',
    title: 'Docker Networking',
    lessons: networking,
  },
  {
    id: 'mod-04',
    title: 'Docker Storage',
    lessons: storage,
  },
  {
    id: 'mod-05',
    title: 'Docker Security',
    lessons: security,
  },
  {
    id: 'mod-06',
    title: 'Docker Orchestration',
    lessons: orchestration,
  },
  {
    id: 'mod-07',
    title: 'Docker Compose',
    lessons: compose,
  },
  {
    id: 'mod-08',
    title: 'Docker Troubleshooting',
    lessons: troubleshooting,
  },
  {
    id: 'mod-09',
    title: 'Docker Installation and Configuration',
    lessons: installation,
  },
  {
    id: 'mod-10',
    title: 'Docker Enterprise',
    lessons: enterprise,
  },
  {
    id: 'mod-11',
    title: 'Advanced Swarm and Orchestration',
    lessons: advancedSwarm,
  },
  {
    id: 'mod-12',
    title: 'Monitoring and Logging',
    lessons: monitoringLogging,
  },
  {
    id: 'mod-13',
    title: 'Backup and Recovery',
    lessons: backupRecovery,
  },
  {
    id: 'mod-14',
    title: 'Performance Tuning',
    lessons: performance,
  },
  {
    id: 'mod-15',
    title: 'DCA Practice Exams',
    lessons: practiceExams,
  },
];

interface ExerciseProps {
  scenario: string;
  expectedCommand: string;
}

const Exercise: React.FC<ExerciseProps> = ({ scenario, expectedCommand }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="my-4 p-4 border rounded bg-gray-50">
      <p className="mb-2 font-medium">{scenario}</p>
      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setSubmitted(true)}
        disabled={submitted}
      >
        {submitted ? 'Answer Shown' : 'Show Answer'}
      </button>
      {submitted && (
        <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto">{expectedCommand}</pre>
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
    if (quizAnswers[quizIndex] !== -1) return; // Prevent changing answer
    const updated = [...quizAnswers];
    updated[quizIndex] = selectedOption;
    setQuizAnswers(updated);
  };

  return (
    <div className="mb-8 max-w-full">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

      <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: lesson.content }} />

      {lesson.quiz?.length ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Quiz</h2>
          {lesson.quiz.map((q: Quiz, idx: number) => (
            <div key={idx} className="mb-4 p-4 border rounded bg-gray-50">
              <p className="font-medium mb-2">{q.question}</p>
              {q.options.map((option: string, i: number) => {
                const isSelected = quizAnswers[idx] === i;
                const isCorrect = q.answer === i;
                return (
                  <button
                    key={i}
                    className={`block w-full text-left p-2 mb-1 rounded border ${
                      isSelected
                        ? isCorrect
                          ? 'bg-green-200 border-green-500'
                          : 'bg-red-200 border-red-500'
                        : 'bg-white border-gray-300 hover:bg-gray-100'
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
          <h2 className="text-xl font-semibold mb-2">Exercises</h2>
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
    <div className="p-4 bg-gray-100 overflow-y-auto border-r" style={{ width: '20rem', height: '100vh' }}>
      <h2 className="font-bold text-xl mb-4">Docker Course for DCA Prep - A.Mohammadpour</h2>
      {courseModules.map((module: CourseModule) => (
        <div key={module.id} className="mb-4">
          <button
            className="w-full text-left font-semibold p-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => toggleModule(module.id)}
          >
            {module.title}
          </button>

          {expandedModules.includes(module.id) && (
            <ul className="mt-2 ml-4">
              {module.lessons.map((lesson: Lesson) => (
                <li key={lesson.id} className="mb-2">
                  <button
                    className={`w-full text-left p-2 rounded ${
                      currentLessonId === lesson.id
                        ? 'bg-blue-200 font-bold'
                        : 'hover:bg-gray-200'
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
    <div className="flex min-h-screen bg-gray-50">
      <CourseSidebar 
        onSelectLesson={handleSelectLesson}
        currentLessonId={selectedLesson?.id || ''}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedLesson ? (
          <LessonComponent lesson={selectedLesson} />
        ) : (
          <div className="text-center text-gray-500">
            <h1 className="text-2xl font-bold mb-4">Welcome to Docker Course for DCA</h1>
            <p>Select a lesson from the sidebar to get started. This course is designed to help you pass the Docker Certified Associate exam.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;