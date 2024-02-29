using AutoMapper;
using Domain;

namespace Application.Core {
    public class MappingProfiles : Profile {
        public MappingProfiles(){
            CreateMap<HistoryQuestion, HistoryQuestion>();
            CreateMap<QuestionGeography, QuestionGeography>();
        }
    }
}