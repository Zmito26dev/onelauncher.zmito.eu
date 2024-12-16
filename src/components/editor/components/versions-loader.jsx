import React, { useState, useEffect } from 'react';

export function MinecraftVersions({ filterType }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest.json');
      const data = await response.json();

      let filteredVersions = [];

      if (filterType === 'release') {
        filteredVersions = data.versions.filter(version => version.type === 'release');
      } else if (filterType === 'snapshot') {
        filteredVersions = data.versions.filter(version => version.type === 'snapshot');
      }

      const versionIds = filteredVersions.map(version => version.id);
      setVersions(versionIds);
    };

    fetchData();
  }, [filterType]);

  return versions.map(version => (
    <option key={version} value={version}>
      {version}
    </option>
  ));
};

export function FabricVersions({ minecraftVersion }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://meta.fabricmc.net/v2/versions/loader/' + minecraftVersion);
      const data = await response.json();
      const versionIds = data.map(item => item.loader.version)
      setVersions(versionIds);
    };

    fetchData();
  }, [minecraftVersion]);

  return versions.map(version => (
    <option key={version} value={version}>
      {version}
    </option>
  ));
};

export function QuiltVersions() {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const parser = new DOMParser();
      const stableVersions = [];

      const response = await fetch('https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-loader/maven-metadata.xml');
      const data = await response.text();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const versionElements = xmlDoc.getElementsByTagName("version");
      for (let i = 0; i < versionElements.length; i++) {
        const version = versionElements[i].textContent;
        if (!version.includes("-beta") && !version.includes("-pre")) {
          stableVersions.push(version);
        }
      }

      stableVersions.sort((a, b) => b.localeCompare(a));
      setVersions(stableVersions);
    };

    fetchData();
  }, []);

  return versions.map((version) => (
    <option key={version} value={version}>
      {version}
    </option>
  ));
}

export function ForgeVersions({ minecraftVersion }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const parser = new DOMParser();
      const stableVersions = [];

      const response = await fetch("https://maven.minecraftforge.net/net/minecraftforge/forge/maven-metadata.xml");
      const data = await response.text();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const versionElements = xmlDoc.getElementsByTagName("version");
      for (let i = 0; i < versionElements.length; i++) {
        const version = versionElements[i].textContent;
        if (version.startsWith(minecraftVersion + "-")) {
          stableVersions.push(version);
        }
      }

      setVersions(stableVersions);
    };

    fetchData();
  }, [minecraftVersion]);

  return versions.map((version) => (
    <option key={version} value={version}>
      {version}
    </option>
  ));
}

export function NeoForgeVersions({ minecraftVersion }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const parser = new DOMParser();
      const stableVersions = [];

      const response = await fetch("https://maven.neoforged.net/releases/net/neoforged/neoforge/maven-metadata.xml");
      const data = await response.text();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const versionElements = xmlDoc.getElementsByTagName("version");
      for (let i = versionElements.length - 1; i >= 0; i--) {
        const version = versionElements[i].textContent;
        stableVersions.push(version);
      }

      setVersions(stableVersions);
    };

    fetchData();
  }, [minecraftVersion]);

  return versions.map((version) => (
    <option key={version} value={version}>
      {version}
    </option>
  ));
}