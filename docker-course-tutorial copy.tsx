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
        expectedCommand: 'docker images'
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
        <li><code>RUN</code> - Execute commands during build, e.g., RUN apk add --no-cache curl. Optimize by combining commands to reduce layers.</li>
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
      <p>Best practices: Use ARG for build-time variables, LABEL for metadata. For DCA: Be able to parse Dockerfiles, identify optimization opportunities, and handle multi-stage builds.</p>
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
        <li>Tag an image: <code>docker tag myimage:latest myrepo/myimage:v1</code> - Creates an alias for pushing.</li>
        <li>Push to registry: <code>docker push myrepo/myimage:v1</code> - Uploads to Docker Hub or private registry. Login with docker login first.</li>
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
        <li>Remove unused images: <code>docker image prune</code> - Removes dangling images (untagged).</li>
        <li>Remove all unused images, containers, networks: <code>docker system prune</code> - Use -a for all unused images, --volumes for volumes.</li>
        <li>Remove specific image: <code>docker rmi image_id</code> - Use -f to force if in use.</li>
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
      <p>DCA: Use inspect for troubleshooting, e.g., checking exposed ports or labels. Know how history reveals build steps.</p>
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
        <li>Create a custom bridge: <code>docker network create my-bridge</code>. Attach with --network.</li>
      </ul>
      <pre>
docker network create my-bridge
docker run -dit --name web --network my-bridge nginx
docker run -dit --name db --network my-bridge mysql
docker exec -it web ping db  # Test communication
      </pre>
      <p>DCA: Custom bridges allow better isolation than default. Know --ip for static IPs, subnet configuration.</p>
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
        <li>Create overlay network: <code>docker network create -d overlay my-overlay</code>. Available to services in Swarm.</li>
        <li>Containers on different hosts can communicate seamlessly via service names.</li>
        <li>Encrypted with --opt encrypted for IPsec.</li>
      </ul>
      <p>DCA: Overlay is global scope in Swarm. Know ingress network for load balancing, and troubleshooting with vxlan interfaces.</p>
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
      <p>Macvlan allows containers to appear as physical devices on the host network with their own MAC and IP.</p>
      <ul>
        <li>Create macvlan network: <code>docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth0 my-macvlan</code></li>
        <li>Containers get IPs from the physical network, no NAT.</li>
      </ul>
      <p>DCA: Use for legacy apps needing direct network access. Note: Host can't communicate with macvlan containers by default; use ip link for subinterfaces.</p>
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
      <p>Link containers (legacy, deprecated): <code>--link web:web</code>. Adds env vars and /etc/hosts entries. Use user-defined networks instead.</p>
      <p>DCA: Know -p vs --publish-all, and how Swarm publishes ports on all nodes. Linking is rarely tested but know it's legacy.</p>
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
        <li>Inspect network details: <code>docker network inspect my-network</code> - Shows subnet, gateway, attached containers.</li>
        <li>Check container IP: <code>docker inspect -f '{{ .NetworkSettings.IPAddress }}' container_name</code></li>
        <li>Ping between containers: <code>docker exec -it container_name ping other_container</code> - Test connectivity.</li>
        <li>Remove unused networks: <code>docker network prune</code></li>
      </ul>
      <p>Other tools: docker network connect/disconnect, ip addr show on host. DCA: Diagnose issues like DNS resolution failures or port conflicts.</p>
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
        <li>Set custom DNS servers: <code>--dns 8.8.8.8 --dns-search example.com</code> when running containers.</li>
        <li>Assign aliases: <code>--network-alias frontend</code> in user-defined networks. Multiple aliases possible.</li>
      </ul>
      <pre>
docker network create my-net
docker run -dit --name web --network my-net --network-alias frontend nginx
docker run -dit --name app --network my-net ping frontend
      </pre>
      <p>DCA: Aliases aid load balancing in networks. Know Docker's built-in DNS server (127.0.0.11) and how it resolves names.</p>
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
        <li>Create a secret: <code>echo "mypassword" | docker secret create db_password -</code> or from file.</li>
        <li>Use in Swarm service: <code>docker service create --name db --secret db_password mysql</code>. Access via /run/secrets/db_password.</li>
      </ul>
      <p>DCA: Secrets are encrypted in Raft logs, only available to granted services. Compare with env vars (less secure).</p>
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
        <li>Enable DCT: <code>export DOCKER_CONTENT_TRUST=1</code> - Pulls only signed images.</li>
        <li>Sign and push: docker push with trust enabled. Uses Notary for signatures.</li>
        <li>Only verified images will be pulled; unsigned fail.</li>
      </ul>
      <p>DCA: Know DCT workflow, root keys, and how it prevents man-in-the-middle attacks. Enterprise features like DTR enhance this.</p>
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
      <p>Scan images for known vulnerabilities (CVEs) to mitigate risks before deployment.</p>
      <ul>
        <li>Docker Hub automated scanning or third-party tools like Trivy, Clair, Snyk.</li>
        <li>Example with Trivy: <code>trivy image --exit-code 1 --no-progress --severity HIGH,CRITICAL myimage:latest</code> - Fails on high severity.</li>
        <li>Integrate into CI/CD for automated scans.</li>
      </ul>
      <p>DCA: Understand vulnerability levels, base image selection (alpine for minimal), and tools like docker scan (built-in).</p>
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
        <li>Use minimal base images like alpine or scratch to reduce attack surface.</li>
        <li>Run as non-root: USER in Dockerfile, --user at runtime.</li>
        <li>Keep images updated: Regularly rebuild with latest patches.</li>
        <li>Limit capabilities: <code>--cap-drop=ALL --cap-add=NET_BIND_SERVICE</code> to drop unnecessary Linux capabilities.</li>
        <li>Use read-only filesystem: <code>--read-only</code>, mount volumes as needed.</li>
        <li>Additional: Enable seccomp/AppArmor profiles, avoid --privileged, use secrets over env vars.</li>
      </ul>
      <p>DCA: Know CIS Docker Benchmark, runtime security with Falco, and swarm mode secrets/configs.</p>
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
      <p>Volumes are the preferred way for persistent storage, decoupled from container lifecycle.</p>
      <ul>
        <li>Created with: <code>docker volume create my-volume</code></li>
        <li>Mounted: <code>docker run -dit -v my-volume:/data ubuntu</code>. Data survives container removal.</li>
        <li>Shared between containers: Multiple can mount the same volume.</li>
        <li>Anonymous volumes: <code>-v /data</code> - Auto-created, removed with --rm.</li>
        <li>Read-only: <code>-v my-volume:/data:ro</code></li>
      </ul>
      <p>DCA: Volumes use host storage but are managed; backup with docker cp or plugins. Know named vs anonymous.</p>
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
      <p>Bind mounts link a host path to a container path, useful for development or config files.</p>
      <ul>
        <li>Command: <code>docker run -dit -v /host/path:/container/path ubuntu</code></li>
        <li>Changes on host reflect in container and vice versa.</li>
        <li>Read-only: <code>-v /host/path:/container/path:ro</code></li>
      </ul>
      <pre>
docker run -dit -v $(pwd)/app:/app dev-image  # For code reloading in dev
      </pre>
      <p>DCA: Binds depend on host filesystem; not portable like volumes. Security risk if mounting sensitive host dirs.</p>
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
      <p>Tmpfs mounts store data in host RAM, ideal for temp or sensitive data not needing persistence.</p>
      <ul>
        <li>Command: <code>docker run -dit --tmpfs /run:size=64m ubuntu</code> - Optional size limit.</li>
        <li>Data is cleared when container stops or host reboots.</li>
      </ul>
      <p>DCA: Tmpfs is Linux-specific; use for secrets in non-Swarm or performance-critical temp storage.</p>
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
        <li>Inspect: <code>docker volume inspect my-volume</code> - Shows mountpoint, driver.</li>
        <li>Remove: <code>docker volume rm my-volume</code> - Only if not in use.</li>
        <li>Prune: <code>docker volume prune</code> - Removes unused volumes; use -f to force.</li>
      </ul>
      <p>DCA: Use inspect for troubleshooting mount issues. Prune in production to free space; know filters like --filter 'label=...'.</p>
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
      <p>Orchestration involves managing multiple containers across hosts: deployment, scaling, networking, and availability.</p>
      <ul>
        <li>Automates tasks like load balancing, service discovery, and rolling updates.</li>
        <li>Docker Swarm is built-in for clustering hosts into a single virtual Docker engine.</li>
        <li>Compose for local multi-container apps; stacks for Swarm.</li>
      </ul>
      <p>DCA: Compare Swarm with Kubernetes; know Swarm's manager-worker architecture and quorum requirements.</p>
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
        <li>Initialize: <code>docker swarm init --advertise-addr IP</code> - Creates a manager node.</li>
        <li>Join: <code>docker swarm join --token TOKEN HOST:2377</code> - Add workers/managers.</li>
        <li>Node roles: Managers handle orchestration (Raft consensus); workers run tasks.</li>
        <li>List nodes: <code>docker node ls</code>; promote/demote with docker node update.</li>
        <li>Built-in TLS: Auto-generates certs for secure communication.</li>
      </ul>
      <p>DCA: Quorum needs odd managers (3/5/7); drain nodes for maintenance. Know swarm leave --force.</p>
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
      <p>Services are the central unit in Swarm, defining desired state for tasks (containers).</p>
      <ul>
        <li>Create: <code>docker service create --name web --replicas 3 -p 80:80 nginx</code></li>
        <li>Scale: <code>docker service scale web=5</code></li>
        <li>Inspect: <code>docker service inspect web</code>; tasks with docker service ps web.</li>
        <li>Constraints: <code>--constraint node.role==manager</code> or node.labels.</li>
        <li>Health checks: --health-cmd, --health-interval; restart policies: --restart-condition.</li>
      </ul>
      <p>DCA: Replicated vs global services; update with --image for rolling updates.</p>
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
      <p>Stacks deploy multi-service applications from Compose files in Swarm mode.</p>
      <ul>
        <li>Deploy: <code>docker stack deploy -c docker-compose.yml mystack</code></li>
        <li>List: <code>docker stack ls</code>; services with docker stack services mystack.</li>
        <li>Remove: <code>docker stack rm mystack</code></li>
      </ul>
      <p>Compose v3+ for stacks: Define services, networks, volumes. DCA: Know stack vs compose up; placement constraints in YAML.</p>
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
        <li>Update: <code>docker service update --image newimage:tag web</code> - Applies changes incrementally.</li>
        <li>Control: <code>--update-parallelism 2 --update-delay 10s --update-failure-action pause</code></li>
        <li>Rollback: <code>docker service rollback web</code> - Reverts to previous config.</li>
      </ul>
      <p>DCA: Monitor with --rollback-monitor; health checks ensure zero-downtime updates.</p>
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
        <li>Compose defines multi-container apps in YAML: services, networks, volumes.</li>
        <li>Start: <code>docker compose up -d --build</code> - Detached, rebuild images.</li>
        <li>Stop: <code>docker compose down --volumes</code> - Remove volumes.</li>
        <li>Logs: <code>docker compose logs -f service</code></li>
        <li>Ps: <code>docker compose ps -a</code> - List services.</li>
      </ul>
      <p>DCA: Compose v2 is go-based; know profiles for conditional services, extends for reuse.</p>
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
        <li>Create secret: <code>echo "mypassword" | docker secret create db_password -</code></li>
        <li>Use: <code>docker service create --secret source=db_password,target=/secrets/pass ...</code></li>
        <li>Create config: <code>docker config create app_config config.yml</code></li>
        <li>Use: <code>--config app_config</code></li>
        <li>Encrypted in manager Raft store; secrets not at rest in containers.</li>
      </ul>
      <p>DCA: Configs for non-sensitive, secrets for sensitive. Rotate with update.</p>
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
      <p>Effective troubleshooting is key for maintaining containerized apps and passing DCA, focusing on systematic diagnosis.</p>
      <ul>
        <li>Inspect container logs for errors using docker logs.</li>
        <li>Check status/resource usage with docker ps/stats.</li>
        <li>Inspect images/volumes/networks for config issues.</li>
        <li>Debug connectivity with exec/ping.</li>
      </ul>
      <p>DCA: Expect scenarios like failed starts, network issues; use --format for custom output.</p>
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
      <p>Logs are primary for debugging app issues inside containers.</p>
      <ul>
        <li>View: <code>docker logs --details container</code></li>
        <li>Follow: <code>docker logs -f -t container</code> - With timestamps.</li>
        <li>Tail: <code>docker logs --tail 50 --since 10m container</code></li>
        <li>Filter: Pipe to grep, e.g., docker logs | grep ERROR.</li>
      </ul>
      <p>DCA: Know log drivers (json-file, syslog), rotation config (--log-opt).</p>
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
        <li>Details: <code>docker inspect --type container name</code></li>
        <li>Resources: <code>docker stats --format "{{.Name}}: {{.CPUPerc}}" name</code></li>
        <li>Processes: <code>docker top name</code> - Like ps aux.</li>
        <li>Troubleshoot: Check .State.Error for exit reasons.</li>
      </ul>
      <p>DCA: Use filters like {{range .Mounts}} for volumes.</p>
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
        <li>Inspect: <code>docker network inspect -v my-network</code></li>
        <li>IP: <code>docker inspect -f '{{json .NetworkSettings.Networks}}' name</code></li>
        <li>Connectivity: <code>docker exec -it name curl other:port</code></li>
        <li>Ports: <code>docker port name</code>; check host firewall.</li>
      </ul>
      <p>DCA: Diagnose DNS (ping by name), ICC (inter-container comm), published ports.</p>
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
        <li>Inspect: <code>docker volume inspect --format '{{ .Mountpoint }}' vol</code></li>
        <li>List: <code>docker volume ls -f dangling=true</code></li>
        <li>Prune: <code>docker volume prune -f</code></li>
        <li>Mounts: Check .Mounts in docker inspect container.</li>
      </ul>
      <p>DCA: Troubleshoot permission issues (chown on host), driver conflicts.</p>
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
        <li>Logs: <code>docker logs --details name</code> for error messages.</li>
        <li>Inspect: <code>docker inspect -f '{{ .State.Error }}' name</code></li>
        <li>Resources: Check limits with --memory, --cpu-shares.</li>
        <li>Image: Verify with docker run --rm image test command.</li>
      </ul>
      <p>DCA: Common causes: Port conflicts, missing volumes, invalid CMD.</p>
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
        <li>Not found: Check tag/registry with docker search.</li>
        <li>Old version: <code>docker pull image:tag</code>; use digests for immutability.</li>
        <li>Dangling: <code>docker image prune -f</code></li>
        <li>Corrupted: docker rmi and re-pull; check storage driver.</li>
      </ul>
      <p>DCA: Use docker manifest inspect for multi-arch issues.</p>
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
        <li>Start with logs, then inspect/stats.</li>
        <li>Verify configs: Images, volumes, networks.</li>
        <li>Resources: Monitor with top/stats.</li>
        <li>Update/minimal images to avoid issues.</li>
        <li>Tools: docker events, system df, external like sysdig.</li>
      </ul>
      <p>DCA: Practice scenarios; know when to use prune/system info.</p>
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
      <p>Docker Compose is a tool for defining and managing multi-container applications using a YAML file (docker-compose.yml).</p>
      <ul>
        <li>Define services (containers), networks, volumes in one file.</li>
        <li>Manages lifecycle: up, down, build, scale.</li>
        <li>v2 is integrated into docker CLI as docker compose (space).</li>
      </ul>
      <p>DCA: Compose for development; stacks for production in Swarm. Know YAML structure.</p>
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
        <li><code>docker compose up --build</code> - Build images, start services.</li>
        <li><code>docker compose up -d</code> - Detached mode.</li>
        <li><code>docker compose down -v</code> - Stop, remove containers/volumes.</li>
        <li><code>docker compose ps -a</code> - List services.</li>
        <li><code>docker compose logs -f service</code> - Follow logs.</li>
      </ul>
      <p>DCA: Use --project-name for multiple instances; exec for commands inside services.</p>
    `,
    quiz: [
      {
        question: 'Which command starts all services in detached mode?',
        options: ['docker-compose start', 'docker compose up -d', 'docker run -dit', 'docker compose down'],
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
      <p>Services define containers; networks for isolation/communication.</p>
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
      <p>DCA: depends_on for start order (not readiness); use healthcheck for that.</p>
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
      <p>Volumes for persistence:</p>
      <pre>
version: "3.9"
services:
  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql
      - ./config:/etc/mysql/conf.d
volumes:
  db-data:
      </pre>
      <p>DCA: Named volumes vs binds; driver opts for custom storage.</p>
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
      <p>Scale for multiple instances:</p>
      <ul>
        <li><code>docker compose up -d --scale web=3</code></li>
        <li>In YAML: deploy: replicas: 3 (for stacks).</li>
      </ul>
      <p>DCA: Scaling in Compose is local; use Swarm for distributed.</p>
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
      <p><code>docker compose down --rmi all -v</code> - Stops, removes containers, images, volumes.</p>
      <p>DCA: Use --timeout for graceful stop; know orphan removal.</p>
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
        <li>Env: <code>environment: [VAR=value]</code> or env_file.</li>
        <li>Healthcheck: test, interval, timeout, retries.</li>
        <li>Overrides: command, entrypoint.</li>
        <li>External: networks/volumes with external: true.</li>
      </ul>
      <pre>
services:
  web:
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
      <p>DCA: Use profiles, secrets in Compose v3 for Swarm compatibility.</p>
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