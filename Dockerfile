######################
# Base builder image #
######################
FROM node:18-bookworm as builder_base

ENV \
  # locale
  LC_ALL=C.UTF-8


RUN apt-get update && apt-get install -y \
        curl \
        git \
        bash \
        build-essential \
        tini \
        openssh-client \
        cargo \
        jq \
        python3-pip \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    # githublab ssh
    && mkdir -p -m 0700 ~/.ssh && ssh-keyscan gitlab.com github.com | sort > ~/.ssh/known_hosts \
    && true

SHELL ["/bin/bash", "-lc"]


####################################
# Base stage for production builds #
####################################
FROM builder_base as production_build
COPY ./docker/entrypoint.sh /docker-entrypoint.sh
WORKDIR /app
COPY . /app
RUN npm install  \
    && chmod a+x /docker-entrypoint.sh \
    && npm run build \
    && true


#########################
# Main production build #
#########################
FROM bash:latest as production
WORKDIR /app
COPY --from=production_build /docker-entrypoint.sh /docker-entrypoint.sh
COPY --from=production_build /app/dist /dist
# Copy build things from production_build so this production image can stay minimalis
RUN chmod a+x /docker-entrypoint.sh \
    && mkdir /deliver \
    && true
ENTRYPOINT ["/docker-entrypoint.sh"]


#####################################
# Base stage for development builds #
#####################################
FROM builder_base as devel_build
WORKDIR /app
COPY ./package-lock.json ./package.json /app
RUN npm install \
    && pip3 install --break-system-packages git-up pre-commit detect-secrets \
    && true


#0############
# Run tests #
#############
FROM devel_build as test
COPY . /app
WORKDIR /app
ENTRYPOINT ["/usr/bin/tini", "--", "docker/entrypoint-test.sh"]
# Re run install to get the service itself installed
RUN npm install \
    && docker/pre_commit_init.sh \
    && true


###########
# Hacking #
###########
FROM devel_build as devel_shell
# Copy everything to the image
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y zsh \
    && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && echo "source /root/.profile" >>/root/.zshrc \
    && true
ENTRYPOINT ["/bin/zsh", "-l"]
