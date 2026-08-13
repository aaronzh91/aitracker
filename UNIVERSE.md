# AI Money Tracker — Coverage Universe Census

**Status:** compiling (census research conducted Aug 13, 2026)
**Scope (ratified):** ~500 entities across the full AI ecosystem, tiered per `SPEC.md` §3.1.

This document is the working census of every entity the tracker will cover. Each line becomes an entity record (`data/entities/*.json`) in Phase 1 — Tier 1 with full treatment, Tier 2 with automated fundamentals + key edges, Tier 3 as identity cards. Line format: **Name** (ticker, country) — suggested tier — scale — AI relevance — key money-flow relationships. `UNVERIFIED` = single-sourced claim to re-verify before it enters a data file.

Sections:

1. Labs & AI-native companies (≥$1B valuation or ≥$100M revenue) — *pending*
2. Hyperscalers, neoclouds, data-center operators & developers — *pending*
3. Compute supply chain — *pending*
4. Physical infrastructure — *pending*
5. Energy — *pending*
6. Software & applications (incumbents with material AI businesses) — *pending*
7. China & international ecosystem — **populated below**
8. Capital (banks, private credit, PE/VC, sovereign funds, insurers, SPVs/JVs) — *pending; core financiers listed in SPEC §9.1*
9. Government & state programs — **populated below (non-US)**

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
