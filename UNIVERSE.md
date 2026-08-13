# AI Money Tracker — Coverage Universe Census

**Status:** census compiled Aug 13, 2026 — ~470 entities across sections 1–7 (section 8 financiers are enumerated in SPEC §9.1; US government programs appear as edges)
**Scope (ratified):** ~500 entities across the full AI ecosystem, tiered per `SPEC.md` §3.1.

This document is the working census of every entity the tracker will cover. Each line becomes an entity record (`data/entities/*.json`) in Phase 1 — Tier 1 with full treatment, Tier 2 with automated fundamentals + key edges, Tier 3 as identity cards. Line format: **Name** (ticker, country) — suggested tier — scale — AI relevance — key money-flow relationships. `UNVERIFIED` = single-sourced claim to re-verify before it enters a data file.

Sections:

1. Labs & AI-native companies (≥$1B valuation or ≥$100M revenue) — ~140 entities
2. Data-center operators, developers & miners-turned-AI — ~20 (hyperscalers/neoclouds in SPEC §9.1)
3. Compute supply chain — ~75
4. Physical infrastructure — ~45
5. Energy — ~35
6. Software & applications (incumbents with material AI businesses) — ~23
7. China & international ecosystem — ~100
8. Capital — core financiers in SPEC §9.1; sovereign funds in §7
9. Government & state programs — non-US in §7; US programs (CHIPS/Intel stake, DoD contracts, GSA OneGov) tracked as edges

---

## 1. Labs & AI-native companies (≥$1B valuation [V] or ≥$100M revenue [R]; surveyed Aug 13, 2026)

*OpenAI, Anthropic, xAI/SpaceX: SPEC §9.1 Tier-1 core. Mistral, Cohere, Sakana, ElevenLabs, Synthesia, Wayve, Black Forest Labs, DeepL, Helsing and other non-US AI-natives: §7.*

### 1.1 New frontier labs

- **Safe Superintelligence** (private, US/IL) — T1 — $32B (Nvidia added $5B Jul 2026); $0 revenue, first model slated Aug 2026; Google Cloud TPU→GPU compute [V]
- **Thinking Machines Lab** (private, US) — T2 — $12B seed; $50B raise talks collapsed Jan 2026; multibillion Google Cloud deal Apr 2026 ([TechCrunch](https://techcrunch.com/2026/04/22/exclusive-google-deepens-thinking-machines-lab-ties-with-new-multi-billion-dollar-deal/)) [V]
- **Reflection AI** (private, US) — T2 — $8B (Nvidia-led) → ~$25–27.5B (Mar 2026); open-weight US frontier play; pre-revenue [V]
- **Prometheus** (private, US) — T3 — launched Nov 2025 w/ $6.2B; reported $12B round at $41B (UNVERIFIED); Bezos co-CEO [V]
- **Humans&** (private, US) — T3 — ~$4.5B seed reported H1 2026 (UNVERIFIED) [V]
- **Periodic Labs / Liquid AI / World Labs / AI21 / Character.AI** — T3 each — $1–3B class; several stale valuations (UNVERIFIED) [V]

### 1.2 Coding

- **Anysphere (Cursor)** (private, US) — T1 — $29.3B priced (Nov 2025); **$60B all-stock SpaceX/xAI acquisition agreed Jun 2026**; ARR ~$2–3B [V+R]
- **Cognition** (private, US) — T1 — $26B (May 2026); in talks at $40B (Aug 12, 2026); ~$1B run-rate reported ([TechCrunch](https://techcrunch.com/2026/08/12/ai-coding-startup-cognition-reportedly-already-in-talks-to-raise-at-40b-valuation/)) [V+R]
- **Lovable** (private, SE) — T2 — $13.3B (Aug 12, 2026, $400M Series C); $500M ARR ([Bloomberg](https://www.bloomberg.com/news/articles/2026-08-12/ai-coding-startup-lovable-raises-400-million-at-13-3-billion-valuation)) [V+R]
- **Replit** (private, US) — T2 — $9B (Mar 2026); ~$525M annualized [V+R]
- **Poolside** (private, US/FR) — T3 — $3B; $14B round and 2GW "Project Horizon" DC with CoreWeave reportedly collapsed 2026 (UNVERIFIED) [V]
- **Magic / StackBlitz / Sourcegraph / n8n** — T3 each — $0.7–2.6B class, several stale (UNVERIFIED) [V]

### 1.3 Enterprise agents & verticals

- **Harvey** (private, US) — T2 — $8B → reported $11B (Mar 2026); ~$190M ARR; OpenAI-backed, Azure compute [V+R]
- **Glean** (private, US) — T2 — $7.2B; ~$300M ARR (+89% y/y) [V+R]
- **Sierra** (private, US) — T2 — $10–11B; ARR estimates conflict ($200M–330M+) [V+R]
- **Clay** (private, US) — T3 — $5B (Jan 2026); $150M ARR [V+R]
- **AlphaSense** (private, US) — T3 — $4B; $400M+ ARR [V+R]
- **Cyera** (private, US/IL) — T3 — ~$6B [V] · **Abnormal AI** — T3 — $5.1B; ~$200M ARR [V+R]
- **Gamma** (private, US) — T3 — $2.1B; $100M+ ARR, profitable at ~50 staff [V+R]
- **Grammarly/Superhuman** — T3 — ~$700M ARR reported [V+R] · **Notion** — T3 — ~$400–500M ARR est (UNVERIFIED) [V+R]
- **Dataiku / DataRobot / Gong** — T3 each — $300M+ ARR class, stale valuations [V+R]
- **Decagon, Writer, Hebbia (a "$12B Jan 2026" claim is aggregator-only — UNVERIFIED), EvenUp, Norm AI, Legora, Eve, EliseAI, Cresta, Parloa, Rogo, Hippocratic AI, Speak** — T3 each — $1–5B class [V]

### 1.4 Data / labeling / talent

- **Scale AI** (private, US) — T1 — ~$29B implied by Meta's $14.3B/49% deal; $870M 2024 revenue; Google/OpenAI/xAI paused work post-deal [V+R]
- **Surge AI** (private, US) — T2 — bootstrapped; $1B+ 2024 revenue (out-earned Scale); $15–25B first-raise reports (UNVERIFIED close) [V+R]
- **Mercor** (private, US) — T2 — $10B (Sep 2025), talks at $20B; $500M run-rate (Feb 2026) [V+R]
- **Turing** (private, US) — T3 — $2.2B; $300M ARR, profitable [V+R] · **Snorkel / Invisible** — T3 [V]

### 1.5 AI infra / tooling

- **Databricks** (private, US) — T1 — **$188B term sheet (Jul 2026)**; $6.9B annualized revenue (+65% y/y), $1B+ AI product revenue ([CNBC](https://www.cnbc.com/2026/06/16/databricks-revenue-growth-tops-80percent-to-6point9-billion-annualized.html)) [V+R]
- **Vercel** (private, US) — T2 — $9.3B; $340M ARR [V+R]
- **VAST Data** (private, US) — T2 — $9.1B (2023; $25B+ round reports UNVERIFIED); CoreWeave/xAI supplier [V+R]
- **Hugging Face** — T2 — $4.5B (stale); ~$130M rev est (UNVERIFIED) [V] · **LangChain** — T3 — $1.25B [V] · **Modular / Anyscale / Fal** — T3 each [V]

### 1.6 Inference hardware / chips

- **Cerebras** (CBRS, US — **IPO'd May 14, 2026**) — T1 — raised $5.5B, ~$66B cap day one; $510M 2025 revenue; OpenAI 750MW compute deal; G42 concentration history ([TechCrunch](https://techcrunch.com/2026/05/14/cerebras-raises-5-5b-kicking-off-2026s-ipo-season-with-a-bang/)) [V+R]
- **Groq** (private, US) — T2 — $6.9B; **Nvidia ~$20B licensing/talent "not-acqui-hire" (Jun 2026)**; Groq continues, $650M re-raise; Humain/Aramco deployments ([TechCrunch](https://techcrunch.com/2026/06/22/ai-chipmaker-groq-confirms-650m-raise-re-staffs-after-nvidias-20b-not-acqui-hire-deal/)) [V]
- **SambaNova** (private, US) — T3 — $11B (Jul 2026); Intel takeover talks stalled; 2027 IPO eyed [V]
- **Etched** (private, US) — T3 — $10.3B (Jul 2026); $1B+ signed contracts claimed (UNVERIFIED) [V]
- **Tenstorrent** — T3 — $2.6B+; Jim Keller, licensing model [V] · **d-Matrix** — T3 — $2B [V] · **Lightmatter** — T3 — $4.4B [V] · **Ayar Labs** — T3 — $3.75B (2026) [V] · **Positron / Rebellions / Hailo** — T3 (partly UNVERIFIED) [V]

### 1.7 Model serving / GPU clouds (beyond SPEC §9.1 neoclouds)

- **Together AI** (private, US) — T2 — $8.3B (Jul 2026); revenue ~$500M–1B annualized reported (UNVERIFIED) [V+R]
- **Fireworks** — T3 — $4B, talks at $15B; ~$200–280M ARR (UNVERIFIED) [V] · **Baseten** — T3 — up to $13B reported Jun 2026 (UNVERIFIED) [V] · **Modal** — T3 — $4.65B [V] · **RunPod** — T3 — $1B; >$100M ARR [V+R] · **Vast.ai / Voltage Park / Genspark** — T3 (UNVERIFIED) [R/V]
- **Fluidstack** (private, UK) — T2 — valuation UNVERIFIED but central node: Google-backstopped lessee across TeraWulf/Cipher/Hut 8 serving Anthropic capacity (§2.2) [V]

### 1.8 Media / creative

- **Midjourney** (private, US) — T2 — bootstrapped; est. $300–500M revenue (UNVERIFIED); Meta licensing deal [R]
- **Suno** (private, US) — T3 — $5.4B (Jun 2026); ~$300M ARR; label litigation → licensing (Warner settled) [V+R]
- **Luma AI** — T3 — ~$4B+ ($900M Series C led by Humain; ~2GW compute plan) [V] · **Runway** — T3 — $3B (stale); ~$120M ARR est [V+R] · **HeyGen** — T3 — ~$100M ARR (UNVERIFIED) [R] · **Descript** — T3 [V]

### 1.9 Consumer, voice, search & agents

- **Perplexity** (private, US) — T1 — **$23B (Jan 2026)**; $450M+ ARR; Comet browser; publisher rev-share [V+R]
- **Granola** — T3 — $1.5B (Mar 2026) [V] · **Deepgram** — T3 — $1.3B (Jan 2026) [V] · **Sesame** — T3 — ~$1B+ (UNVERIFIED) [V] · **Exa** — T3 — $2.2B (May 2026) [V]

### 1.10 Robotics / embodied / AV / defense

- **Figure AI** (private, US) — T2 — $39B (Sep 2025); BMW deployment; IPO chatter [V]
- **Waymo** (Alphabet sub raising externally, US) — T1 — **$126B post ($16B round, Feb 2026)**; 20+ cities incl. Tokyo/London [V]
- **Anduril** (private, US) — T2 — >$60B (May 2026), talks at ~$100B; ~$2B+ 2025 revenue est; OpenAI partnership, Microsoft IVAS [V+R]
- **Applied Intuition** — T2 — $15B; $171M DoD deal [V+R] · **Shield AI** — T3 — $12.7B (Mar 2026) [V] · **Saronic** — T3 — $9.25B [V] · **Physical Intelligence** — T2 — $5.6B, talks near $11B (UNVERIFIED) [V] · **Skild** — T3 — $4.5B, reports of ~$15B (UNVERIFIED) [V] · **Apptronik** — T3 — ~$5.4B [V] · **1X** — T3 — seeking $10B+ (UNVERIFIED) [V] · **Agility Robotics** — T3 — SPAC'd ~$2.5B (Jul 2026); $300M+ bookings [V+R] · **Nuro** — T3 — $6B [V] · **Aurora** (AUR) — T3 — public, driverless TX trucking [V] · **Dexterity / Field AI / Gecko / Waabi / Skydio / Helsing (§7.6) / True Anomaly** — T3 each [V]

### 1.11 Health / science

- **OpenEvidence** (private, US) — T2 — **$12B (Jan 2026)**; ad-model; used by 40%+ of US physicians [V]
- **Abridge** — T2 — $5.3B + Apr-2026 extension; ~$100M+ ARR (UNVERIFIED); Epic partnership [V+R]
- **Tempus AI** (TEM) — T3 — public; ~$1.26B FY25 revenue [V+R] · **Isomorphic Labs** — T3 — multi-$B (UNVERIFIED); Lilly/Novartis ~$3B milestones [V] · **Chai / Xaira / Formation Bio / Ambience / Recursion (RXRX) / Pomelo** — T3 each (partly UNVERIFIED) [V]

*Data-quality flags: Hebbia "$12B", Cursor "SpaceX $60B option" variants, and aggregator-only 2026 unicorns (Prometheus, Humans&, Positron, True Anomaly, Pomelo) each need a primary source before entering data files. Acquired/absorbed teams (Windsurf, Moveworks, W&B, Celestial AI → Marvell $3.25B, Inflection, Adept, Limitless, Sana, Graphcore) are tracked under their acquirers as edges, not entities.*

## 2. Data-center operators, developers & miners-turned-AI (surveyed Aug 13, 2026)

*Hyperscalers and neoclouds (Microsoft, Alphabet, Amazon, Meta, Oracle; CoreWeave, Nebius, Lambda, Crusoe, Nscale, Fluidstack) are in SPEC §9.1 as Tier-1 core.*

### 2.1 REITs / colo / hyperscale developers

- **Equinix** (EQIX, US) — T2 — record Q2-26 bookings; xScale program >$23B / ~2GW for hyperscalers.
- **Digital Realty** (DLR, US) — T2 — record ~$1.9B backlog; largest-ever single lease (200MW AI inference, Q1-26); $16.5B development pipeline, 61% preleased.
- **Iron Mountain** (IRM, US) — T3 — DC revenue +39% y/y, crossing $1B/yr run-rate.
- **Switch** (private — DigitalBridge/IFM, US) — T2 — 12GW Oklo nuclear master agreement; IPO candidate at >$40B (UNVERIFIED).
- **QTS** (Blackstone, US) — T2 — Blackstone's largest portfolio company; ~10GW+ pipeline (UNVERIFIED detail).
- **CyrusOne** (KKR/GIP, US) — T3 — multi-GW program; $9B+ financing since 2024 (UNVERIFIED).
- **Vantage Data Centers** (DigitalBridge/Silver Lake, US) — T1 — $25B/1.4GW "Frontier" TX campus for OpenAI/Oracle; >$64B total pipeline ([Vantage](https://vantage-dc.com/news/vantage-data-centers-unveils-plans-for-frontier-a-25b-mega-campus-in-texas-to-meet-unprecedented-ai-demand/)).
- **STACK Infrastructure** (IPI/Blue Owl, US) — T3 — multi-GW global pipeline (UNVERIFIED).
- **EdgeConneX** (EQT, US) — T3 — multi-GW builds; Anthropic-linked reports (UNVERIFIED).
- **Aligned Data Centers** (AIP/MGX/GIP, US) — T2 — acquired ~$40B EV, closed Jul 2026 — the marquee AI-infra M&A ([Aligned](https://aligneddc.com/press-release/aip-mgx-and-blackrocks-gip-close-acquisition-of-aligned-data-centers/)).
- **Compass / CloudHQ** (private, US) — T3 each — multi-GW hyperscale builds (UNVERIFIED).
- **Applied Digital** (APLD, US) — T2 — AI lease backlog **$36.2B** per FY26 10-K: CoreWeave 400MW (~$11B) + $5B hyperscaler lease ([Applied Digital](https://ir.applieddigital.com/news-events/press-releases/detail/132/applied-digital-announces-5-billion-ai-factory-lease-with)).

### 2.2 Miners-turned-AI (recurring anchors: Fluidstack backstopped by Google, Anthropic as end-user; CoreWeave)

- **TeraWulf** (WULF, US) — T2 — ~360MW to Fluidstack, $6.7B→$16B contracted w/ extensions; Google backstop ~$3.2B + ~14% equity ([TeraWulf](https://investors.terawulf.com/news-events/press-releases/detail/114/terawulf-announces-fluidstack-expansion-with-160-mw-cb-5-lease-at-lake-mariner)).
- **Cipher Mining** (CIFR, US) — T2 — AWS 15-yr ~$5.5B/300MW lease + Fluidstack/Google ~$3B (Google ~5.4% stake) ([DCD](https://www.datacenterdynamics.com/en/news/aws-signs-300mw-hosting-deal-to-lease-capacity-from-cipher-mining/)).
- **IREN** (IREN, US/AU) — T2 — **$9.7B/5yr Microsoft GPU-cloud contract** (750MW Childress TX); $5.8B Dell purchase ([IREN](https://iren.gcs-web.com/news-releases/news-release-details/iren-secures-97bn-ai-cloud-contract-microsoft)).
- **Hut 8** (HUT, US/CA) — T2 — **$26.6B cumulative AI DC contract value** across 949MW; River Bend $7B Fluidstack lease Google-backstopped, Anthropic end-user ([PR](https://www.prnewswire.com/news-releases/hut-8-signs-15-year-245-mw-ai-data-center-lease-at-river-bend-campus-with-total-contract-value-of-7-0-billion-302644600.html)).
- **Galaxy Digital** (GLXY, US) — T2 — Helios fully leased to CoreWeave: 526MW, >$30B potential 25-yr value; $3.5B junk-bond funding ([DCD](https://www.datacenterdynamics.com/en/news/coreweave-leases-another-260mw-capacity-from-galaxy-in-texas/)).
- **Core Scientific** (CORZ, US) — T3 — rejected CoreWeave's $9B merger; ~$10B+ CoreWeave HPC contracts standalone.
- **Riot Platforms** (RIOT, US) — T3 — 20-yr, ~$9.1B lease (to $16.1B) at Rockdale TX; tenant reported to be Anthropic ([QZ](https://qz.com/anthropic-riot-platforms-data-center-deal-9-billion-081126)).

## 3. Compute supply chain (surveyed Aug 13, 2026)

*Nvidia, AMD, Broadcom, TSMC, Intel, SK Hynix, Samsung: SPEC §9.1. China chips: §7.2.*

### 3.1 Memory & storage — a full pricing super-cycle in 2026

- **Micron** (MU, US) — T1 — FQ3-26 revenue **$41.5B vs $9.3B a year earlier**; FQ4 guide ~$50B at ~86% GM; HBM sold out through 2026 ([Micron IR](https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-record-results-third-quarter)).
- **Kioxia** (285A.T, JP) — T3 — 75% non-GAAP op margin; 2026 NAND fully booked ([TrendForce](https://www.trendforce.com/news/2026/02/13/news-kioxia-posts-record-%C2%A5543-6b-q3-fy25-revenue-confirms-2026-nand-fully-booked/)).
- **SanDisk / Western Digital / Seagate** (US) — T3 each — enterprise SSD/nearline HDD sold out into 2027 (UNVERIFIED).

### 3.2 Servers / ODM & EMS

- **Dell** (DELL, US) — T1 — **$24.4B AI orders in Q1 FY27; $51.3B AI backlog; ~$60B FY27 AI revenue guide** — customers incl. CoreWeave, xAI, IREN ([Dell](https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~05~dell-technologies-delivers-first-quarter-fiscal-2027-financial-results.htm)).
- **Hon Hai / Foxconn** (2317.TW, TW) — T1 — world's largest AI-server assembler; AI servers >51% of Q2-26 revenue; builds Stargate hardware in Houston (UNVERIFIED figures).
- **Super Micro** (SMCI, US) — T2 — FY25 ~$22B (70%+ AI); FY26 guide ~$33B (UNVERIFIED).
- **HPE** (HPE, US) — T2 — AI backlog $5.9B; cumulative AI bookings $16.4B; Juniper networking +148%.
- **Quanta Computer / Wiwynn / Wistron / Inventec / Pegatron / Gigabyte** (TW) — T2/T3 — the AI ODM complex; revenues ~doubling (UNVERIFIED).
- **Celestica** (CLS, CA) — T2 — FY26 ~$19B guide; 1.6T switch programs ([Investing](https://www.investing.com/news/transcripts/earnings-call-transcript-celestica-tops-q2-2026-estimates-and-raises-outlook-93CH-4816847)).
- **Jabil / Flex / Sanmina** (US) — T3 each — EMS AI ramps; Sanmina bought ZT Systems mfg from AMD (~$3B) (UNVERIFIED).

### 3.3 Networking & optics

- **Arista** (ANET, US) — T2 — AI back-end >$1.5B target met; 2026 guide ≥$11B (UNVERIFIED).
- **Coherent** (COHR, US) — T2 — DC & comms +41% y/y (~75% of revenue); Nvidia investee ([Futurum](https://futurumgroup.com/insights/coherent-q3-fy-2026-ai-data-center-demand-accelerates-optical-growth/)).
- **Lumentum** (LITE, US) — T2 — record 800G, 1.6T ramping; Nvidia investee ([Lumentum](https://investor.lumentum.com/financial-news-releases/news-details/2026/Lumentum-Announces-Fourth-Quarter-and-Full-Fiscal-Year-2026-Results/default.aspx)).
- **Amphenol** (APH, US) — T2 — IT datacom +89% y/y, all AI; AI run-rate $10.5–11B ([TIKR](https://www.tikr.com/blog/amphenols-q2-earnings-beat-every-estimate-the-commscope-bet-is-paying-off-faster-than-expected)).
- **Corning** (GLW, US) — T2 — enterprise/DC +65%; Meta/Nvidia/Amazon supply agreements ([ConvergeDigest](https://convergedigest.com/corning-optical-communications-sales-jump-32-on-ai-data-center-demand/)).
- **Marvell** (MRVL, US) — T2 — DC revenue >$6B FY26; custom AI silicon ~$1.5B (2×); bought Celestial AI $3.25B.
- **Astera Labs** (ALAB, US) — T2 — Q2-26 +104% y/y ([GlobeNewswire](https://www.globenewswire.com/news-release/2026/08/04/3338807/0/en/Astera-Labs-Reports-Second-Quarter-2026-Financial-Results.html)).
- **Cisco / Ciena / Fabrinet / TE Connectivity / Credo / AOI / MACOM / Semtech / Nokia / Volex** — T3 each — AI networking/optics complex (partly UNVERIFIED).

### 3.4 Power semis & rack power

- **Infineon** (IFX.DE, DE) — T2 — AI DC power >€1.6B FY26 → ~€2.5B FY27 target; Nvidia 800VDC partner ([PSW](https://www.powersemiconductorsweekly.com/2026/08/06/infineon-posts-record-q3-fy2026-revenue-as-ai-data-center-power-demand-drives-growth/)).
- **Delta Electronics** (2308.TW, TW) — T2 — top Nvidia PSU/busbar/cooling supplier; 1H26 revenue +41% ([DigiTimes](https://www.digitimes.com/news/a20260709PD244/delta-electronics-revenue-demand-2026-infrastructure.html)).
- **Monolithic Power / Vicor / onsemi / Navitas / Lite-On / Advanced Energy** — T3 each — 800VDC transition plays (UNVERIFIED).

### 3.5 Semicap / EDA / IP

- **ASML** (ASML, NL) — T1 — EUV monopoly; also Mistral's largest shareholder (§7.6).
- **Tokyo Electron** (8035.T, JP) — T2 — record FY26; AI ~40% of sales ([Investing](https://www.investing.com/news/company-news/tokyo-electron-q1-fy2027-slides-ai-boom-drives-record-sales-outlook-93CH-4827886)).
- **Advantest** (6857.T, JP) — T2 — tester TAM raised to $13–14.5B on AI test intensity ([TheLec](https://www.thelec.net/news/articleView.html?idxno=12645)).
- **Applied Materials / Lam / KLA** (US) — T2 each — HBM/advanced-packaging leverage (UNVERIFIED splits).
- **Synopsys** (SNPS, US) — T2 — Nvidia investee; custom-silicon EDA wave. **Cadence** (CDNS) — T2. **Arm** (ARM) — T2 — DC CPU royalty surge; SoftBank ~90%.
- **Teradyne / Disco / ASM Intl / Onto / Camtek / Alchip / Global Unichip** — T3 each (UNVERIFIED).

### 3.6 Packaging & substrates (bottleneck cluster)

- **ASE** (ASX, TW) — T2 — leading-edge packaging revenue >$3.5B 2026 → ≥$7.5B 2027 target; record $10.5B capex; takes TSMC CoWoS overflow ([TrendForce](https://www.trendforce.com/news/2026/07/31/news-ase-again-raises-2026-capex-to-record-us10-5b-eyes-2x-leading-edge-advanced-packaging-revenue-by-2027/)).
- **Ibiden** (4062.T, JP) — T2 — Nvidia's lead ABF substrate supplier; capacity sold out (UNVERIFIED).
- **Amkor / Shinko / Unimicron / Nan Ya PCB / Samsung Electro-Mechanics / AT&S / BESI / Hanmi / TTM / Elite Material** — T3 each — substrates, hybrid bonding, HBM TC-bonders, AI PCBs/laminates (UNVERIFIED).

## 4. Physical infrastructure (surveyed Aug 13, 2026)

### 4.1 Electrical equipment / grid / transformers / switchgear

- **Eaton** (ETN, US/IE) — T1 — DC largest end-market; closed **$9.5B Boyd Thermal acquisition** (Mar 2026) — grid-to-chip; Nvidia 800VDC partner ([Eaton](https://www.eaton.com/us/en-us/company/news-insights/news-releases/2026/eaton-completes-acquisition-of-leading-liquid-cooling-solutions-provider-boyd-thermal.html)).
- **Schneider Electric** (SU.PA, FR) — T1 — FY25 >€40B; DC ~24% of group, biggest growth driver; owns Motivair/APC ([W.Media](https://w.media/schneider-electric-posts-record-revenue-driven-by-data-center-demand/)).
- **Vertiv** (VRT, US) — T1 — FY26 guide ~$14B (+31% organic); backlog ~$15B; Q4-25 orders +~250% y/y ([PR](https://www.prnewswire.com/news-releases/vertiv-reports-strong-second-quarter-2026-with-diluted-eps-growth-of-53-adjusted-diluted-eps-growth-of-60-raises-full-year-2026-guidance-across-all-key-metrics-302837598.html)).
- **ABB** (ABBN.SW, CH) — T2 — Q1-26 DC orders up triple-digit % ([RTE](https://www.rte.ie/news/business/2026/0422/1569497-abb-lifts-2026-sales-outlook-on-data-centre-demand/)).
- **Hitachi Energy** (JP) — T2 — backlog >$43B; multi-year transformer lead times — a named bottleneck (UNVERIFIED level).
- **HD Hyundai Electric** (267260.KS, KR) — T2 — backlog ~$7.9B (>3 years of production) ([SeDaily](https://en.sedaily.com/news/2026/05/01/korean-power-equipment-makers-clinch-record-orders-on-us)).
- **Siemens AG / Hyosung Heavy / LS Electric / Powell / Legrand / nVent / Hubbell / Mitsubishi Electric / Fuji Electric** — T2/T3 — switchgear/grid complex; Powell's record >$400M single mega-DC order (partly UNVERIFIED).

### 4.2 Cooling / thermal

- **Modine** (MOD, US) — T2 — DCs = 35% of FY26 sales, +>70% y/y; **$165M customer deposit + >$4B expected DC cooling sales CY27–29** ([PR](https://www.prnewswire.com/news-releases/modine-reports-fourth-quarter-fiscal-2026-results-302782279.html)).
- **Munters** (MTRS.ST, SE) — T2 — DC order intake +264% organic (book-to-bill 3.6×) ([Munters](https://www.munters.com/en-us/news-media/press-releases/2026/exceptional-demand-while-earnings-weakened/)).
- **Johnson Controls** (JCI) — T2 — record ~$14–15B backlog (UNVERIFIED mix). **AAON** — T3 — BASX backlog +160–185%.
- **Trane / Carrier / SPX / CoolIT / LiquidStack / Nidec** — T3 each — chillers→cold plates complex (UNVERIFIED).

### 4.3 Engineering & construction / electrical labor (bottleneck cluster)

- **Quanta Services** (PWR, US) — T1 — record **$48.5B backlog**; grid + DC electrical (Cupertino Electric) ([PR](https://www.prnewswire.com/news-releases/quanta-services-reports-first-quarter-2026-results-302758147.html)).
- **Comfort Systems USA** (FIX, US) — T2 — record **$14.1B backlog (+73% y/y)**; tech = 58% of revenue; Q2 revenue +50% ([Investing](https://www.investing.com/news/company-news/comfort-systems-q2-2026-slides-revenue-tops-3b-backlog-hits-14b-93CH-4812234)).
- **EMCOR** (EME, US) — T2 — record RPOs $17.1B (+44%); DC comms +45% ([StockStory](https://stockstory.org/us/stocks/nyse/eme/news/earnings-call/eme-q2-deep-dive-data-center-demand-and-strategic-acquisitions-drive-growth)).
- **Sterling Infrastructure** (STRL, US) — T3 — e-infra revenue +192%; 92% of e-infra backlog from DCs.
- **MYR / IES / Primoris / MasTec / Argan / Dycom / Fluor / Jacobs / AECOM** — T3 each — records across T&D, fit-out, gas EPC, fiber (UNVERIFIED details).
- **Turner (Hochtief) / Bechtel / DPR / Rosendin / Holder** — T3 each — the hyperscale GC/electrical tier (private; UNVERIFIED figures).

### 4.4 Cables / materials

- **Prysmian** (PRY.MI, IT) — T2 — raised 2026 guide on DC demand; €5.5B Molex optical deal ([Prysmian](https://www.prysmian.com/en/media/press-releases/digital-solutions-20-07-2026)).
- **Fujikura** (5803.T, JP) — T2 — FY26 OP +44% on AI optical; ¥300B to ~quadruple US fiber capacity ([W.Media](https://w.media/fujikura-to-triple-fiber-capacity-with-%C2%A5300bn-ai-push/)).
- **Nexans / Southwire / Furukawa / Sumitomo Electric / LS Cable** — T3 each (UNVERIFIED).

## 5. Energy (surveyed Aug 13, 2026)

### 5.1 Power generation / utilities / IPPs

- **Constellation** (CEG, US) — T1 — largest US nuclear fleet (~55GW post-Calpine); Microsoft Crane/TMI restart; Meta Clinton PPA; +920MW new nuclear PPAs Q2-26 ([StockTitan](https://www.stocktitan.net/news/CEG/constellation-reports-second-quarter-2026-rtppfjewi2nw.html)).
- **Vistra** (VST, US) — T1 — >2,600MW Meta nuclear PPAs; Amazon Comanche Peak; $4.7B gas-fleet purchase ([Vistra](https://investor.vistracorp.com/2026-01-09-Vistra-and-Meta-Announce-Agreements-to-Support-Nuclear-Plants-in-PJM-and-Add-New-Nuclear-Generation-to-the-Grid)).
- **Talen** (TLN, US) — T1 — $18B/1,920MW AWS Susquehanna PPA — the one disclosed-price nuclear PPA ([POWER](https://www.powermag.com/talen-amazon-launch-18b-nuclear-ppa-a-grid-connected-ipp-model-for-the-data-center-era/)).
- **NRG** (NRG, US) — T2 — 5.4GW gas CCGT JV with GE Vernova/Kiewit; 10–15GW pipeline ([UtilityDive](https://www.utilitydive.com/news/nrg-aims-for-2026-next-step-in-54-gw-gas-deal-with-ge-vernova-kiewit/805692/)).
- **NextEra** (NEE) — T2 — Duane Arnold restart for Google. **Entergy** (ETR) — T2 — Meta Hyperion's ~2.2GW load, ~2.3GW new CCGTs. **Dominion** (D) — T2 — ~40GW of NoVA DC capacity in engineering/construction.
- **Duke / AEP / Southern / Sempra-Oncor / Exelon / PPL / PSEG / AES / Fermi (FRMI)** — T3 each — multi-GW DC pipelines; AES taken private ~$38B by BlackRock GIP consortium; Fermi's 11GW Amarillo campus (UNVERIFIED details).

### 5.2 Nuclear & SMR

- **Westinghouse** (Brookfield/Cameco) — T2 — **$80B US-government partnership** for AP1000/AP300 fleet; government gets 20% of distributions above $17.5B ([UtilityDive](https://www.utilitydive.com/news/westinghouse-cameco-brookfield-nuclear/803999/)).
- **Oklo** (OKLO) — T2 — 12GW Switch master agreement; ~14GW pipeline ([Oklo](https://oklo.com/newsroom/news-details/2024/Oklo-and-Switch-Form-Landmark-Strategic-Relationship-to-Deploy-12-Gigawatts-of-Advanced-Nuclear-Power-One-of-the-Largest-Corporate-Clean-Power-Agreements-Ever-Signed/default.aspx)).
- **NuScale / X-energy / TerraPower / Kairos / BWXT / Centrus / Cameco / Holtec** — T3 each — the SMR-and-fuel complex; Amazon (X-energy), Google (Kairos), Nvidia (TerraPower) money already inside (partly UNVERIFIED).

### 5.3 Turbines / gensets / on-site power (bottleneck cluster)

- **GE Vernova** (GEV, US) — T1 — gas-turbine backlog + reservations **116GW** (~5 years of output; ≥125GW by YE26); ~20% explicitly DCs ([Turbomachinery](https://www.turbomachinerymag.com/view/ge-vernova-gas-turbine-backlog-hits-116-gw-as-power-orders-more-than-double)).
- **Siemens Energy** (ENR.DE, DE) — T1 — record €154B backlog; ~87GW GT order book, up to 4-yr waits; Grid Technologies €51B ([Yahoo](https://finance.yahoo.com/energy/articles/siemens-energy-beats-forecasts-ai-144126001.html)).
- **Caterpillar** (CAT, US) — T2 — backlog +92% y/y to **$72B** on DC power gen; tripling capacity by 2030 ([ManufacturingDive](https://www.manufacturingdive.com/news/caterpillar-sales-surpass-20b-growing-data-center-demand-q2-2026/827068/)).
- **Mitsubishi Heavy** (7011.T, JP) — T2 — GT contracts >2× prior pace; doubling capacity by FY2030 ([EnergyTech](https://www.energytech.com/data-center-power/article/55329126/strong-us-and-asian-data-center-orders-propel-mitsubishi-heavy-industries-in-energy-sector)).
- **Bloom Energy** (BE, US) — T2 — **~$7.65B of DC contracts in 90 days**: Oracle 2.8GW master agreement, $5B Brookfield, 1GW AEP ([CNBC](https://www.cnbc.com/2026/04/14/oracle-orcl-bloom-energy-be-stock-data-center-ai-power.html)).
- **Cummins / Rolls-Royce / Baker Hughes / Doosan Enerbility / INNIO / VoltaGrid** — T3 each — gensets, NovaLT, mobile gas fleets (UNVERIFIED).

## 6. Software & applications — incumbents with material AI businesses (surveyed Aug 13, 2026)

- **Salesforce** (CRM, US) — T1 — Agentforce ARR $500M (Dec 2025) → **$1B (May 2026)**; Informatica $8B closed; Anthropic preferred-model partnership ([CX Today](https://www.cxtoday.com/contact-center/agentforce-hits-1-billion-arr-ai-agents-customer-service/)).
- **ServiceNow** (NOW, US) — T1 — AI ACV crossed **$1B (Q2-26, +40% q/q)**; Moveworks $2.85B ([EnterpriseDNA](https://enterprisedna.co/resources/news/servicenow-ai-acv-1-billion-agentic-enterprise-q2-2026/)).
- **Palantir** (PLTR, US) — T1 — Q2-26 revenue **$1.94B, +93% y/y** (US commercial +149%) on AIP; also the marquee AI-valuation battleground (Burry short) ([CNBC](https://www.cnbc.com/2026/08/04/palantir-2q-earnings-ai-sovereign-tools.html)).
- **Adobe** (ADBE, US) — T2 — AI-influenced ARR >$5B FY25; AI-first standalone ARR ~$250M+; Semrush $1.9B (UNVERIFIED split).
- **SAP** (SAP, DE) — T2 — Joule; ~50% of cloud order entry incl. AI; Delos sovereign cloud (also §7.6).
- **Apple** (AAPL, US) — T1 — pays Google **~$1B/yr** for 1.2T-param Gemini powering Siri (Jan 2026); ChatGPT integration reportedly cashless ([CNBC](https://www.cnbc.com/2026/01/12/apple-google-ai-siri-gemini.html)).
- **IBM** (IBM, US) — T2 — GenAI book of business **>$12.5B** inception-to-date (~80% consulting) ([IBM](https://newsroom.ibm.com/2026-01-28-IBM-RELEASES-FOURTH-QUARTER-RESULTS)).
- **Accenture** (ACN, IE/US) — T2 — cumulative GenAI bookings $3B+ (2025), FY25 ~$5B+ (UNVERIFIED).
- **Snowflake** (SNOW, US) — T2 — $200M each OpenAI + Anthropic partnerships; Cortex AI.
- **Datadog** (DDOG, US) — T2 — AI-native cohort ~8.5–11% of ARR; OpenAI its largest customer (UNVERIFIED %).
- **Figma** (FIG, US) — T3 — ~$1B run-rate; AI features vs. Lovable/v0 competition.
- **Duolingo** (DUOL, US) — T3 — AI-first pivot; Q2-26 revenue $298.5M (+18%); cast as AI-disruption victim in market narrative ([SEC](https://www.sec.gov/Archives/edgar/data/0001562088/000162828026053299/q2fy26duolingo6-30x26share.htm)).
- **MongoDB / Atlassian / Intuit / Shopify / HubSpot / Workday / Infosys / TCS / Wipro / Canva / Zoom** — T3 each — AI product lines, model-access deals (Intuit→OpenAI >$100M), agentic-commerce integrations, HyperVault DCs (TCS; also §7.8) (partly UNVERIFIED).

---

## 7. China & international ecosystem (~100 entities, surveyed Aug 13, 2026)

### 7.1 China — hyperscalers & frontier labs

- **Alibaba** (BABA/9988.HK, CN) — T1 — ~$300B+ — Qwen family; cloud/AI revenue +38% y/y (Mar-26 qtr), AI revenue triple-digit growth 11 straight quarters; will "overshoot" its RMB 380B (~$53B) 3-yr AI/cloud capex program ([SCMP](https://www.scmp.com/tech/big-tech/article/3353451/alibaba-ai-revenue-logs-triple-digit-growth-11th-quarter-amid-strategic-reshuffle)) — investor in Moonshot/Zhipu/MiniMax/01.AI; T-Head in-house chips.
- **Tencent** (0700.HK, CN) — T1 — ~$500B+ — Hunyuan 3; Q2-26 capex ~RMB 52B, ~3× y/y; investor in Moonshot/Zhipu/MiniMax/StepFun; reportedly first external Baidu-Kunlun chip orders (UNVERIFIED).
- **Baidu** (BIDU/9888.HK, CN) — T1 — ~$40–50B — Ernie 5.1; Q1-26: AI >50% of core revenue (AI revenue RMB 13.6B +49%); Kunlunxin P800 chips sold to Tencent/China Mobile/CMB.
- **ByteDance** (private, CN) — T1 — est. ~$300B+ (secondaries, UNVERIFIED); ~$50B 2025 profit — Doubao 345M MAU, >120T daily tokens; 2026 AI capex raised ≥25% to ~RMB 200B (~$28–30B), weighing up to $70B ([SCMP](https://www.scmp.com/tech/article/3352906/bytedance-raises-2026-capex-least-25-amid-ai-boom-rising-memory-costs-sources-say), [Bloomberg](https://www.bloomberg.com/news/articles/2026-05-27/bytedance-weighs-capex-of-as-much-as-70-billion-in-ai-push)).
- **Huawei** (private, CN) — T1 — 2024 revenue RMB 862B — full stack: ~600K Ascend 910C planned 2026 (~2× 2025); Ascend 950 with in-house HBM from 2026; Atlas SuperPoD; day-0 platform for DeepSeek V4; Entity List ([TrendForce](https://www.trendforce.com/news/2025/09/18/news-huawei-unveils-ascend-950-with-in-house-hbm-in-2026-touts-superpod-to-rival-nvidia/)).
- **DeepSeek** (private, CN) — T1 — High-Flyer-funded; historically no external capital (2026 ">$50B valuation" claims conflict with that history — UNVERIFIED) — V4 (Apr 2026): 1.6T-param MoE trained/served on Huawei Ascend from day 0 ([Fortune](https://fortune.com/2026/04/24/deepseek-v4-ai-model-price-performance-china-open-source/)).
- **Moonshot AI** (private, CN) — T2 — ~$20B (mid-2026), seeking ~$2B at ~$30B; HK IPO targeted (UNVERIFIED) — Kimi/K3; Alibaba/Tencent/HongShan backed.
- **Zhipu AI / Z.ai** (HKEX, CN) — T2 — listed Jan 8, 2026 at ~$6.6B, raised ~$558M ([CNBC](https://www.cnbc.com/2026/01/09/minimax-hong-kong-ipo-ai-tigers-zhipu.html)) — GLM; sovereign "AI-in-a-box" exports.
- **MiniMax** (HKEX, CN) — T2 — IPO Jan 9, 2026, raised ~$620M, ~$13B mkt cap after debut double.
- **StepFun** (private, CN) — T3 — ~$2B+ (2024, UNVERIFIED) — multimodal/agents; Shanghai state + Tencent backed.
- **01.AI** (private, CN) — T3 — ~$1B (2024); exited frontier pretraining (UNVERIFIED).
- **Baichuan** (private, CN) — T3 — ~$2.8B (2024, UNVERIFIED) — pivoted to healthcare AI.
- **iFlytek** (002230.SZ, CN) — T2 — ~$15.5B mkt cap, TTM revenue ~$3.9B — Spark LLM trained entirely on Ascend; Entity List.
- **SenseTime** (0020.HK, CN) — T3 — ~$6.9B, TTM revenue ~$697M — GenAI/compute leasing pivot; Entity List.

### 7.2 China — chips & semi equipment

- **SMIC** (0981.HK/688981.SS, CN) — T1 — 2025 revenue $9.3B → >$11B 2026E; doubling 7nm capacity 2026; sole advanced-logic source for Huawei/Cambricon; Entity List; Big Fund's largest single injection $1.5B ([TrendForce](https://www.trendforce.com/news/2025/12/15/insights-cambricon-remains-chinas-top-ai-chip-startup-rumored-2026-triple-output-faces-smic-limits/)).
- **Cambricon** (688256.SS, CN) — T1 — Q1-26 revenue $423M (multi-fold y/y); targets 500K AI chips delivered 2026, constrained by SMIC capacity + HBM; on the state AI-procurement whitelist with Huawei ([Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/cambricon-targets-500000-ai-chips-in-2026-as-china-accelerates-domestic-hardware-push)).
- **Moore Threads** (688795.SS, CN) — T2 — STAR debut Dec 2025 +425%; ~RMB 300B (~$43B) mkt cap; H1-26 revenue RMB 1.7B (+147%), near breakeven; Entity List.
- **Biren Technology** (HKEX, CN) — T2 — first listed Chinese GPU co (Jan 2, 2026), +76% debut, ~$10.6B ([Fortune](https://fortune.com/2026/01/02/ai-chip-designer-birens-shares-surge-76-on-debut-in-hong-kong/)).
- **MetaX / Enflame** (CN) — T3 — second-tier AI chip startups, 2025–26 STAR listings (details UNVERIFIED).
- **Hygon** (688041.SS, CN) — T2 — x86-derived CPUs + DCU accelerators; absorbing **Sugon** (603019.SS) via ~RMB 400B share-swap (status UNVERIFIED); core of domestic server stack.
- **Loongson** (688047.SS, CN) — T3 — domestic CPU; government/defense niche.
- **CXMT** (STAR IPO filed, CN) — T2 — DRAM/HBM; Big Fund II holds 8.73%; ramping HBM for Huawei's roadmap (UNVERIFIED timing); US-restricted since Dec 2024.
- **YMTC** (private, CN) — T3 — NAND; Entity List; ~$7B state recap 2023.
- **Naura** (002371.SZ, CN) — T2 — China's #1 chip-equipment maker; 2024 revenue RMB 29.8B (+35%); Big Fund III beneficiary.
- **AMEC** (688012.SS, CN) — T3 — etch/deposition; key SMIC/YMTC supplier.
- **SiCarrier** (private, CN) — T3 — Huawei-linked equipment maker; ~$11B valuation 2025 (UNVERIFIED).
- **Hua Hong** (1347.HK, CN) — T3 — #2 China foundry, mature nodes; limited AI exposure.

**Export-control frame (2026):** H20 banned Apr 2025 ($5.5B Nvidia write-off) → re-licensed Jul 2025 with a 15%-of-China-revenue payment to the US government → Beijing discouraged purchases; **B30A/Blackwell-for-China blocked in 2026**; Jun 1, 2026: US bans extended to Chinese firms' overseas data centers. TrendForce: domestic chips ~50% of China's high-end AI chip market by end-2026 ([Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-responds-to-reports-that-its-h20-gpu-for-china-is-ending-production-next-gen-b30a-green-light-up-to-the-united-states-government-according-to-ceo-jensen-huang), [Al Jazeera](https://www.aljazeera.com/economy/2026/6/1/us-says-ban-on-ai-chip-shipments-applies-to-chinese-firms-outside-china)).

### 7.3 China — data centers, servers, state vehicles

- **GDS Holdings** (GDS/9698.HK, CN) — T2 — 2026 revenue guide RMB 12.4–12.9B; RMB 30–50B 3-yr AI-DC capex program ([Bamboo Works](https://thebambooworks.com/gds-commits-up-to-50-billion-yuan-to-capture-booming-ai-data-center-demand/)).
- **DayOne** (private, SG/CN) — T3 — GDS International spin-off; GIC/Temasek-backed; IPO speculation (UNVERIFIED).
- **VNET** (VNET, CN) — T3 — 450–500MW delivering 2026, capex RMB 10–12B; CATL energy-storage tie-up.
- **WinTriX (ex-Chindata)** (private, CN) — T3 — Bain-owned; ByteDance's main wholesale DC landlord.
- **Inspur/IEIT** (000977.SZ, CN) — T2 — #1 China AI-server OEM (~RMB 115B+ revenue); Entity List.
- **Lenovo** (0992.HK, CN/HK) — T2 — FY24/25 revenue $69.1B; global AI server + AI PC.
- **ZTE** (0763.HK, CN) — T3 — telecom equipment + AI servers for telco DC buildouts.
- **H3C** (Unisplendour parent, CN) — T3 — major domestic AI-server share (UNVERIFIED).
- **China Mobile / China Telecom / China Unicom** (HK-listed, CN) — T3 each — state AI-infra builders ("East Data West Compute"); Kunlun chip customers.
- **Big Fund III** (state, CN) — T1 (as capital node) — RMB 344B ($47.5B); 2026 pivot to advanced packaging, equipment, AI chips ([TrendForce](https://www.trendforce.com/news/2026/08/07/news-chinas-big-fund-phase-iii-pivot-from-fab-building-to-advanced-packaging-equipment-and-ai-chips/)).
- **National/municipal AI funds** (state, CN) — T3 — RMB 60B national AI fund + RMB 100B-scale municipal funds + RMB ~1T VC guidance fund (UNVERIFIED detail); Beijing weighing ~RMB 2T/5-yr national DC program ([Investing.com](https://www.investing.com/news/stock-market-news/gds-vnet-shares-jump-on-china-data-center-funding-plan-93CH-4732166)).

### 7.4 Korea

- **Samsung Electronics** (005930.KS, KR) — T1 — ~$400B+ — OpenAI Stargate memory LOI (with SK hynix): up to 900K DRAM wafers/month ≈ 40% of global output, locked through 2029; HBM4 mass production from Feb 2026; Tesla AI5/AI6 foundry deal $16.5B; 50K-GPU AI factory ([OpenAI](https://openai.com/index/samsung-and-sk-join-stargate/), [Nvidia](https://nvidianews.nvidia.com/news/south-korea-ai-infrastructure)).
- **SK hynix** (000660.KS, KR) — T1 — ~$1T mkt cap (Aug 2026); ~60% HBM share; Stargate LOI co-signatory; M15X fab wafer-in Q1 2026; HBM4 lead supplier to Nvidia.
- **SK Group / SK Telecom** (017670.KS, KR) — T2 — AI factory up to 50K Nvidia GPUs; SKT–AWS Ulsan DC (~$5B); Stargate Korea MOUs; expanded Nvidia accord Jul 2026 ([DCD](https://www.datacenterdynamics.com/en/news/nvidia-to-deploy-more-than-250000-gpus-across-south-korea-with-samsung-sk-group-and-hyundai-all-announcing-ai-factories/)).
- **Naver** (035420.KS, KR) — T2 — **Nvidia invested $1B for 4.5% (Jul 2026)**; 60K+ GPU sovereign/physical-AI factory ([KED Global](https://www.kedglobal.com/corporate-investment/newsView/ked202607270003)).
- **Kakao** (035720.KS, KR) — T3 — OpenAI product partnership; channel for MSIT 50K-GPU sovereign deployment.
- **LG Group / LG AI Research** (KR) — T3 — Exaone 4.0; AI factory with Nvidia.
- **Hyundai Motor Group** (005380.KS, KR) — T3 — 50K-GPU physical-AI factory; Boston Dynamics.
- **Korea MSIT sovereign program** (state, KR) — T3 — >250K Nvidia GPUs announced across Korea (Oct 2025).

### 7.5 Japan

- **SoftBank Group** (9984.T, JP) — T1 — OpenAI investment $32.4B (Mar 2026) → **$64.6B planned by Oct 1, 2026 (~13%)** ([SoftBank](https://group.softbank/en/news/press/20260227)); ~90% Arm owner; Ampere $6.5B; Stargate ~40%; sold entire Nvidia stake to fund OpenAI.
- **Noetra** (private, JP) — T3 — new SoftBank-led sovereign LLM co (NEC/Honda/Sony shareholders); METI awarding ¥387.3B FY2026 (UNVERIFIED single source).
- **NTT / NTT Data** (9432.T/9613.T, JP) — T2 — tsuzumi LLM; global DC expansion; NTT DC REIT (SGX, Jul 2025).
- **Fujitsu** (6702.T, JP) — T3 — Takane LLM; expanded Nvidia partnership; MONAKA CPU 2027.
- **Rakuten** (4755.T, JP) — T3 — JP models; OpenAI enterprise partnership.
- **Sakana AI** (private, JP) — T2 — $2.7B valuation; ~$200M Series B (into 2026); Japan's most valuable startup; Nvidia/NTT/Sony backers.
- **Preferred Networks** (private, JP) — T3 — MN-Core chips + models; Toyota/Fanuc backed.
- **Rapidus** (state-backed, JP) — T2 — 2nm foundry project; cumulative government commitments ~¥1.7T+; 2nm pilot line since Apr 2025, mass production target 2027.
- **Japan METI/JIC programs** (state, JP) — T3 — ¥10T AI/chip support framework.

### 7.6 Europe

- **Mistral AI** (private, FR) — T1 — $3.5B raised at **$20B (Jun 2026)**; **ASML owns ~11% (€1.3B, largest shareholder)**; ARR >$400M (Jan 2026, 20× y/y), targeting $1B by end-2026 ([CNBC](https://www.cnbc.com/2026/05/19/mistral-cnbc-disruptor-50-ranking.html), [Mistral](https://mistral.ai/news/mistral-ai-raises-1-7-b-to-accelerate-technological-progress-with-ai/)).
- **ASML** (ASML, NL) — T1 — ~€400B — EUV monopoly (the litho bottleneck) + now an AI investor via the Mistral stake.
- **Nebius Group** (NBIS, NL) — T1 — ~$46B contracted backlog (Microsoft $19.4B + Meta $27B + Nvidia $2B investment); 2026: revenue $3.0–3.4B, capex $16–20B.
- **Nscale** (private, UK) — T2 — raised $2B at **$14.6B** (Nvidia participating); ~$20B+ Microsoft contracts (~200K GB300 across TX/Norway/UK/Portugal); Stargate UK site; IPO eyed 2026 ([DCD](https://www.datacenterdynamics.com/en/news/nscale-to-supply-microsoft-with-additional-100000-nvidia-gpus-in-us-and-europe/)).
- **Northern Data** (DE) — T3 — **acquired by Rumble (RUM), closed Jun 17, 2026**; ~22K GPUs, ~250MW.
- **Aleph Alpha** (private, DE) — T3 — pivoted to enterprise/government AI ops (Schwarz/Bosch/SAP backed).
- **Black Forest Labs** (private, DE) — T2 — $300M Series B at **$3.25B** (closed early 2026); FLUX image models.
- **DeepL** (private, DE) — T3 — $2B (2024); ~$200M ARR (UNVERIFIED).
- **Synthesia** (private, UK) — T2 — $200M raise Jan 2026 (~$4B, UNVERIFIED); $100M+ ARR.
- **ElevenLabs** (private, UK/US) — T2 — $500M Series D at **$11B** (Feb 2026, Nvidia-backed), eyeing IPO ([CNBC](https://www.cnbc.com/2026/02/04/nvidia-backed-ai-startup-elevenlabs-11-billion-valuation.html)).
- **Wayve** (private, UK) — T2 — $1.2B Series D at **$8.6B** (Feb 2026; Microsoft/Nvidia/Uber + OEMs) ([CNBC](https://www.cnbc.com/2026/02/24/wayve-fundraise-nvidia-microsoft.html)).
- **Helsing** (private, DE) — T2 — ~€12B (Jun 2025, UNVERIFIED 2026 update) — defense AI.
- **SAP** (SAP, DE) — T2 — ~€300B — Joule agents; Delos sovereign cloud for German government.
- **Deutsche Telekom** (DTE.DE, DE) — T3 — €1B industrial AI cloud with Nvidia (~10K GPUs, live early 2026).
- **EU InvestAI / AI gigafactories** (state, EU) — T2 (capital node) — €200B umbrella; gigafactory tender opened Jul 30, 2026: up to 7 sites >100K chips each, ~€10B public + expected $23B+ private; bids close Nov 12, 2026 ([EC](https://commission.europa.eu/topics/competitiveness/competitiveness-coordination-tool-projects/ai-gigafactories_en)).
- **France AI program** (state, FR) — T3 — €109B private-commitment package incl. MGX 1GW campus, Brookfield €20B.
- **UK programs** (state, UK) — T3 — Stargate UK (OpenAI/Nvidia/Nscale, Blyth), Microsoft $30B UK pledge.

### 7.7 Middle East

- **G42** (private, UAE) — T1 — Microsoft holds $1.5B stake; Khazna DCs/Core42; Stargate UAE operator; +200MW Microsoft-Khazna expansion from late 2026; with MBZUAI = Cerebras's two largest customers ([TechInformed](https://techinformed.com/microsoft-g42-announce-200-megawatt-uae-data-center-expansion/)).
- **Stargate UAE** (JV: G42/OpenAI/Oracle/Nvidia/SoftBank/Cisco, UAE) — T1 (SPV node) — 1GW Abu Dhabi cluster in 5GW UAE–US campus; **Phase 1 (200MW) commissioned Feb 2026**.
- **MGX** (state, UAE) — T1 — closed **$49B AI fund (Jul 1, 2026)**; co-led OpenAI $122B round, Anthropic Feb-2026 round, xAI $20B (Jan 2026); AIP founding partner ([CNBC](https://www.cnbc.com/2026/07/01/mgx-ai-fund-uae-49-billion.html)).
- **Mubadala** (state, UAE) — T2 — MGX co-founder; GlobalFoundries majority owner.
- **Microsoft UAE program** — captured as edges: $15.2B commitment through 2029.
- **Humain** (PIF-owned, SA) — T1 — ~600K-GPU Nvidia program; **AMD $10B/1GW; Qualcomm 200MW; xAI 500MW JV (xAI first customer); invested $3B in xAI Series E (Feb 2026)**; 6.6GW pipeline by 2034 ([CNBC](https://www.cnbc.com/2025/11/19/musks-xai-will-be-customer-for-nvidia-data-center-in-saudi-arabia.html)).
- **PIF** (state, SA) — T2 — Humain owner; Alat ($100B electronics vehicle); ~$100B AI push (partially UNVERIFIED).
- **Aramco / Aramco Digital** (2222.SR, SA) — T3 — Groq Dammam inference DC (up to $1.5B expansion; 2026 status UNVERIFIED).
- **DataVolt** (private, SA) — T3 — $20B US AI campus pledge (UNVERIFIED progress).
- **ADIA** (state, UAE) / **QIA** (state, QA) — T3 each — mostly indirect exposure; QIA reported in Anthropic rounds (UNVERIFIED).

### 7.8 India, SE Asia, Australia, Canada + global funds

- **Reliance / Jio** (RELIANCE.NS, IN) — T2 — GW-scale Jamnagar AI DC; **Meta JV: 168MW AI DC (Jun 2026)**; Meta holds $5.7B Jio stake ([TechCrunch](https://techcrunch.com/2026/06/10/meta-signs-first-ai-data-center-deal-in-india-with-reliance/)).
- **Tata Group / TCS** (TCS.NS, IN) — T2 — **OpenAI Stargate India anchor: 100MW via TCS HyperVault (Feb 2026), option to 1GW** ([TechCrunch](https://techcrunch.com/2026/02/18/openai-taps-tata-for-100mw-ai-data-center-capacity-in-india-eyes-1gw/)).
- **Adani Group / AdaniConneX** (IN) — T3 — Google's ~$15B Visakhapatnam AI hub uses Adani-linked infra (UNVERIFIED detail); 1GW+ pipeline.
- **Yotta** (private, IN) — T3 — Shakti Cloud, ~16K+ H100s; Stargate-India talks.
- **Ola Krutrim** (private, IN) — T3 — $1.2B (2024); scaled-back ambitions.
- **Singtel / Nxera** (Z74.SI, SG) — T3 — KKR ~20% stake in Nxera; GPU-as-a-service.
- **ST Telemedia GDC** (private, SG) — T3 — KKR-led S$1.75B raise; 1GW+ APAC pipeline.
- **AirTrunk** (Blackstone, AU) — T2 — acquired ~A$24B (2024); >1.8GW APAC pipeline; AWS/Microsoft/ByteDance landlord.
- **NextDC** (NXT.AX, AU) — T3 — AI-driven contracted-capacity surge (UNVERIFIED figures).
- **Cohere** (private, CA) — T2 — $7B (Aug 2025; AMD/Nvidia/PSP); ~$240M ARR 2026 (UNVERIFIED); sovereign "North" platform.
- **Telus** (T.TO, CA) — T3 — sovereign AI factories (Rimouski/Kamloops) with Nvidia.
- **Temasek** (state, SG) — T2 — S$434B+ portfolio; AI ~6% → target 15% by 2031; holds Anthropic, OpenAI; AIP member ([CNBC](https://www.cnbc.com/2026/07/08/singapores-temasek-eyes-ai-private-credit-with-portfolio-at-record.html)).
- **GIC** (state, SG) — T2 — 13 AI deals in H1 2026 with Temasek (Anthropic, OpenAI, Harvey, DayOne…); Equinix xScale JVs (~$15B).
- **Norges Bank IM** (state, NO) — T3 — ~1–1.3% passive stakes in Nvidia/Microsoft/ASML/TSMC (approx).
- **CPPIB** (state, CA) / **Khazanah** (state, MY) — T3 each — fund-level/indirect exposure (UNVERIFIED direct stakes).

### 7.9 Key China/international money-flow edges (for the deal graph)

| Payer → Payee | Type / magnitude | Date | Source |
|---|---|---|---|
| Alibaba → AI/cloud capex | RMB 380B/3yr program, will "overshoot" | reaffirmed May 2026 | [SCMP](https://www.scmp.com/tech/big-tech/article/3353451/alibaba-ai-revenue-logs-triple-digit-growth-11th-quarter-amid-strategic-reshuffle) |
| ByteDance → AI capex | 2026 budget ≥RMB 200B (~$28–30B); up to $70B weighed | May 2026 | [Bloomberg](https://www.bloomberg.com/news/articles/2026-05-27/bytedance-weighs-capex-of-as-much-as-70-billion-in-ai-push) |
| Tencent → AI capex | Q2-26 ~RMB 52B (~3× y/y) | Aug 2026 | [BigGo](https://finance.biggo.com/news/US_TCEHY_2026-08-12) |
| Nvidia → US Treasury | 15% of China H20 revenue (license condition) | Aug 2025 | [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-responds-to-reports-that-its-h20-gpu-for-china-is-ending-production-next-gen-b30a-green-light-up-to-the-united-states-government-according-to-ceo-jensen-huang) |
| China buyers → Nvidia B30A | BLOCKED 2026; bans extended to offshore Chinese DCs Jun 1, 2026 | 2026 | [Al Jazeera](https://www.aljazeera.com/economy/2026/6/1/us-says-ban-on-ai-chip-shipments-applies-to-chinese-firms-outside-china) |
| Chinese labs/clouds → Huawei Ascend | ~600K 910C units planned 2026 | 2026 | [Presenc](https://presenc.ai/research/chinese-ai-chips-landscape-2026) |
| Chinese clouds → Cambricon | 500K accelerators targeted 2026 | 2026 | [Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/cambricon-targets-500000-ai-chips-in-2026-as-china-accelerates-domestic-hardware-push) |
| Big Fund III → packaging/equipment/AI chips | RMB 344B; 2026 deployment pivot | Aug 2026 | [TrendForce](https://www.trendforce.com/news/2026/08/07/news-chinas-big-fund-phase-iii-pivot-from-fab-building-to-advanced-packaging-equipment-and-ai-chips/) |
| Beijing → national DC buildout | ~RMB 2T/5yr program under consideration | 2026 | [Investing.com](https://www.investing.com/news/stock-market-news/gds-vnet-shares-jump-on-china-data-center-funding-plan-93CH-4732166) |
| OpenAI ↔ Samsung + SK hynix | Stargate memory LOI: up to 900K DRAM wafers/mo (~40% global), to 2029 | Oct 2025 | [OpenAI](https://openai.com/index/samsung-and-sk-join-stargate/) |
| Nvidia → Naver | $1B for 4.5% | Jul 2026 | [KED Global](https://www.kedglobal.com/corporate-investment/newsView/ked202607270003) |
| Nvidia → Korea (Samsung/SK/Hyundai/Naver/MSIT) | >250K GPUs across AI factories | Oct 2025 | [Nvidia](https://nvidianews.nvidia.com/news/south-korea-ai-infrastructure) |
| SoftBank → OpenAI | $32.4B invested → $64.6B planned by Oct 1, 2026 (~13%) | Feb–Apr 2026 | [SoftBank](https://group.softbank/en/news/press/20260227) |
| METI → Noetra | ¥387.3B FY2026 development fees | 2026 | UNVERIFIED single source |
| ASML → Mistral | €1.3B, ~11% (largest shareholder) | Sept 2025 | [Mistral](https://mistral.ai/news/mistral-ai-raises-1-7-b-to-accelerate-technological-progress-with-ai/) |
| Microsoft → G42/UAE | $1.5B equity + $15.2B program through 2029 | 2024–2026 | [Microsoft](https://news.microsoft.com/source/emea/2025/11/microsoft-and-g42-accelerate-uaes-digital-future-with-major-data-centre-expansion/) |
| MGX → OpenAI / Anthropic / xAI | co-led $122B, $30B, $20B rounds from $49B fund | H1 2026 | [CNBC](https://www.cnbc.com/2026/07/01/mgx-ai-fund-uae-49-billion.html) |
| Humain → AMD / Nvidia / Qualcomm | $10B AMD; ~600K Nvidia GPUs; 200MW Qualcomm | 2025–26 | [vision2030.ai](https://vision2030.ai/analysis/humain-ai-infrastructure/) |
| Humain → xAI | $3B Series E + 500MW JV DC (xAI anchor tenant) | Feb 2026 | [DCD](https://www.datacenterdynamics.com/en/news/xai-humain-data-center-elon-musk/) |
| OpenAI → Tata/TCS | Stargate India: 100MW, option to 1GW | Feb 2026 | [TechCrunch](https://techcrunch.com/2026/02/18/openai-taps-tata-for-100mw-ai-data-center-capacity-in-india-eyes-1gw/) |
| Meta → Reliance | 168MW Jamnagar JV | Jun 2026 | [TechCrunch](https://techcrunch.com/2026/06/10/meta-signs-first-ai-data-center-deal-in-india-with-reliance/) |
| EU → AI gigafactories | ~€10B public tender (7 sites) under €200B InvestAI | Jul 2026 | [EC](https://commission.europa.eu/topics/competitiveness/competitiveness-coordination-tool-projects/ai-gigafactories_en) |
| GIC/Temasek → AI portfolio | 13 deals H1 2026 (Anthropic, OpenAI, Harvey, DayOne…) | H1 2026 | [Asia Tech Review](https://www.asiatechreview.com/p/singapores-sovereign-wealth-funds) |
