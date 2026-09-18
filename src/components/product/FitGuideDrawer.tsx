"use client";

import { useEffect, useState } from "react";
import { BETWEEN_SIZES, MEASURING_NOTE, MEASURING_STEPS, SIZE_CHART, SIZE_RANGE_NOTE } from "@/data/fit";
import { Icon } from "@/components/ui/Icon";

export function FitGuideDrawer({ triggerLabel = "Size guide" }: { triggerLabel?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [open]);
  return <><button className="fit-guide-trigger" type="button" onClick={() => setOpen(true)}>{triggerLabel} <Icon name="arrow" size={13} /></button><div className={`fit-guide-modal ${open ? "fit-guide-open" : ""}`} aria-hidden={!open}><button type="button" className="fit-guide-backdrop" onClick={() => setOpen(false)} aria-label="Close size guide" /><aside role="dialog" aria-modal="true" aria-label="Piura size guide"><header><div><p className="label accent">Find your Piura fit</p><h2 className="display display-md">Make it yours.</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Close size guide"><Icon name="close" /></button></header><div className="fit-guide-content"><p className="fit-guide-intro">{SIZE_RANGE_NOTE}</p><div className="fit-guide-table-wrap"><table><caption>Body measurements in inches</caption><thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr></thead><tbody>{SIZE_CHART.map((row) => <tr key={row.size}><th>{row.size}</th><td>{row.bust.join("–")}</td><td>{row.waist.join("–")}</td><td>{row.hips.join("–")}</td></tr>)}</tbody></table></div><p className="fit-guide-note">{MEASURING_NOTE}</p><ol className="measure-steps">{MEASURING_STEPS.map((step) => <li key={step.key}><span>{step.letter}</span><div><h3>{step.name}</h3><p>{step.how}</p></div></li>)}</ol><div className="between-sizes"><span className="label">Between sizes?</span><p>{BETWEEN_SIZES}</p></div><p className="fit-help">Unsure between two sizes? <a href="/contact">Write to us</a>. We answer fit questions personally.</p></div></aside></div></>;
}
