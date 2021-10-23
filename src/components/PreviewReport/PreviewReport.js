/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { useState, useEffect } from 'react';

import CustomBtn from '../generic/CustomBtn';
import WrapperScaleImg from './components/WrapperScaleImg/WrapperScaleImg';
import PreviewSapmleZone from './components/PreviewSampleZone/PreviewSampleZone';
import { initIPFS, getFilesFromDirectory } from '../../state/ipfs';

const PreviewReport = ({ setViewStageReport, totalData, currentStage }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [filesNames, setFilesNames] = useState([]);

  let currentSubZone = {};
  let sampleZones = [];

  if (totalData.subZonesPolygon?.length && totalData.subZonesPolygon[currentStage.id - 1]) {
    currentSubZone = { ...totalData.subZonesPolygon[currentStage.id - 1] };
  }

  if (Object.keys(currentSubZone).length) {
    sampleZones = [...currentSubZone.sampleZones];
  }

  useEffect(async () => {
    if (currentSubZone.filesCidDir) {
      const ipfs = await initIPFS();
      const updateArray = await getFilesFromDirectory(
        ipfs,
        currentSubZone.filesCidDir,
      );
      setFilesNames(updateArray.map((item) => item.path));
    }
  }, []);

  return (
    <div className="preview-report__body-wrapper">
      <div className="preview-report__body">
        <div className="preview-report__close" onClick={() => {
          document.body.classList.remove('no-scroll');
          setViewStageReport(false);
        }}>
          <i className="icon-close" />
        </div>
        {Object.keys(currentSubZone).length && sampleZones.length ? (
          <>
            <div className="preview-report__monitoring">
              <div className="preview-report__area-info">
                <div className="preview-report__area">
                  <span>Area, sq. km</span>
                  <p className="preview-report__input-value">
                    {currentSubZone.square}
                  </p>
                </div>
                <div className="preview-report__num-zones">
                  <span>Number of Sample zones</span>
                  <p className="preview-report__input-value">
                    {sampleZones.length}
                  </p>
                </div>
              </div>
              <div className="preview-report__preview-map">
                {/* <span>Point 3 places on the map to define Sample zones for reporting in this Stage</span>
              <img src={map} alt="map" />
              <span className="preview-report__preview-link">Download Sample zones coordinates</span> */}
              </div>
              <WrapperScaleImg cid={currentSubZone.cidSampleScreenShot} />
            </div>
            <form>
              <div className="preview-report__sz-list">
                {sampleZones.map((zone) => (
                  <PreviewSapmleZone
                    sampleName={zone.sampleName}
                    coordinates={zone.coordinates}
                    sampleTrees={zone.sampleTrees}
                    key={`${zone.sampleName}${zone.index}`}
                  />
                ))}
              </div>
              <div className="preview-report_documents">
                {!!filesNames.length && (
                  <div className="preview-report_documents_wrap">
                    <h4>Uploaded Stage Report</h4>
                    {filesNames.reverse().map((item, index) => (
                      <span
                        className="preview-report_documents_wrap-img"
                        key={item}
                      >{`${index + 1}. ${item}`}</span>
                    ))}
                  </div>
                )}
                {!!currentSubZone.additional && (
                  <div className="preview-report_documents_wrap">
                    <h4>Additional Comments</h4>
                    <span className="preview-report_documents_wrap-coments">
                      {currentSubZone.additional}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </>
        ) : (
          <span>No stage report!</span>
        )}
      </div>
    </div>
  );
};

export default PreviewReport;
