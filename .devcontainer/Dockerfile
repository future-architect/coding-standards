#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
ARG VARIANT
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

# ** [Optional] Uncomment this section to install additional packages. **
#
# ENV DEBIAN_FRONTEND=noninteractive
# RUN apt-get update \
#    && apt-get -y install --no-install-recommends <your-package-list-here> \
#    #
#    # Clean up
#    && apt-get autoremove -y \
#    && apt-get clean -y \
#    && rm -rf /var/lib/apt/lists/*
# ENV DEBIAN_FRONTEND=dialog

#
# Locale
RUN apt-get install -y git procps locales \
  && sed -i '/^#.* ja_JP.UTF-8 /s/^#//' /etc/locale.gen \
  && locale-gen \
  && ln -fs /usr/share/zoneinfo/Asia/Tokyo /etc/localtime\
  && dpkg-reconfigure -f noninteractive tzdata
ENV LANG='ja_jp.utf8'

# Pandoc
RUN apt update && apt-get install -y pandoc
